import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { getFont, type FontDef } from "@/lib/fonts";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  let font: FontDef | undefined;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
      font = getFont(session.metadata?.font_slug ?? "");
    } catch {
      email = null;
    }
  }

  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col justify-center px-6 py-24">
      <p className="text-3xl" style={{ fontFamily: font?.weights[0].cssFamily }}>
        {font?.name ?? "MHZ"}
      </p>
      <h1 className="mt-6 text-2xl">You&apos;re in.</h1>
      <p className="mt-4 text-muted">
        {email
          ? `We've set up an account for ${email} with your license attached.`
          : "We've set up an account with your license attached."}{" "}
        Sign in with a magic link to view your embed code, manage registered domains, and
        download the font files.
      </p>
      <Link
        href="/login"
        className="mt-8 inline-flex w-fit items-center gap-2 bg-accent px-6 py-3 font-semibold text-[#0b0b0c] transition hover:brightness-110"
      >
        Sign in to your account
      </Link>
    </main>
  );
}
