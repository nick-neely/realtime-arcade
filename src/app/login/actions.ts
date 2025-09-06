"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

/**
 * Sends a magic link (email OTP) to the provided email.
 * The confirmation link will land on `/auth/confirm` which verifies the token,
 * then redirects to the `next` path (defaults to `/dashboard`).
 */
export async function login(formData: FormData) {
  const supabase = await createSupabaseServer();

  const email = String(formData.get("email") ?? "").trim();
  const next = String(formData.get("next") ?? "/dashboard");

  if (!email) {
    redirect("/login?error=missing_email");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const emailRedirectTo = `${siteUrl}/auth/confirm?next=${encodeURIComponent(next)}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) {
    redirect("/error");
  }

  redirect("/login?sent=1");
}
