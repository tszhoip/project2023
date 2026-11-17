"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="mx-auto flex max-w-sm flex-1 flex-col justify-center px-6 py-24">
      <Link href="/" className="text-2xl font-semibold tracking-tight">
        MHZ
      </Link>
      <h1 className="mt-8 text-xl">Sign in to your account</h1>
      <p className="mt-2 text-sm text-muted">
        Enter the email you used at checkout — we&apos;ll send a magic link.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded-lg border border-border p-4 text-sm">
          Check <span className="text-foreground">{email}</span> for a sign-in link.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-6 py-3 font-semibold text-[#0b0b0c] transition hover:brightness-110 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send magic link"}
          </button>
          {status === "error" && (
            <p className="text-sm text-accent">Something went wrong. Try again.</p>
          )}
        </form>
      )}
    </main>
  );
}
