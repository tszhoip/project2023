import { readFile } from "node:fs/promises";
import path from "node:path";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createR2Client, hasR2Config } from "@/lib/r2";
import { getFont } from "@/lib/fonts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ weight: string }> }
) {
  const { weight } = await params;
  const licenseId = request.nextUrl.searchParams.get("license_id");
  if (!licenseId) {
    return NextResponse.json({ error: "Missing license_id" }, { status: 400 });
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
    .select("id, font:fonts(slug)")
    .eq("id", licenseId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle<{ id: string; font: { slug: string } | { slug: string }[] | null }>();
  if (!license) {
    return NextResponse.json({ error: "No active license" }, { status: 403 });
  }

  // The license decides which font this is; the weight just picks a file within it.
  const licensed = Array.isArray(license.font) ? license.font[0] : license.font;
  const font = licensed ? getFont(licensed.slug) : undefined;
  const fontWeight = font?.weights.find((w) => w.name.toLowerCase() === weight.toLowerCase());
  if (!font || !fontWeight) {
    return NextResponse.json({ error: "Unknown weight" }, { status: 404 });
  }

  const fileName = `${font.slug}-${weight.toLowerCase()}.woff2`;
  let bytes: Buffer;

  if (hasR2Config()) {
    const r2 = createR2Client();
    const object = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: `${font.slug}/${weight.toLowerCase()}.woff2`,
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
