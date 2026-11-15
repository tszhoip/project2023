import { readFile } from "node:fs/promises";
import path from "node:path";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createR2Client, hasR2Config } from "@/lib/r2";
import { FONT } from "@/lib/font";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ weight: string }> }
) {
  const { weight } = await params;
  const licenseId = request.nextUrl.searchParams.get("license_id");
  if (!licenseId) {
    return NextResponse.json({ error: "Missing license_id" }, { status: 400 });
  }

  const fontWeight = FONT.weights.find((w) => w.name.toLowerCase() === weight.toLowerCase());
  if (!fontWeight) {
    return NextResponse.json({ error: "Unknown weight" }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: license } = await supabase
    .from("licenses")
    .select("id")
    .eq("id", licenseId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();
  if (!license) {
    return NextResponse.json({ error: "No active license" }, { status: 403 });
  }

  const fileName = `${FONT.slug}-${weight.toLowerCase()}.woff2`;
  let bytes: Buffer;

  if (hasR2Config()) {
    const r2 = createR2Client();
    const object = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: `${FONT.slug}/${weight.toLowerCase()}.woff2`,
      })
    );
    bytes = Buffer.from(await object.Body!.transformToByteArray());
  } else {
    // Dev fallback so the flow is testable before R2 is provisioned.
    const filePath = path.join(process.cwd(), "public", fontWeight.woff2);
    bytes = await readFile(filePath);
  }

  return new NextResponse(new Blob([new Uint8Array(bytes)]), {
    headers: {
      "Content-Type": "font/woff2",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
