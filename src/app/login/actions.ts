"use server";

import { getServerSideURL } from "@/lib/getURL";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

  const siteUrl = getServerSideURL();
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

/**
 * Initiates GitHub OAuth login flow.
 * Redirects to GitHub for authentication, then back to the OAuth callback route.
 */
export async function loginWithGitHub(formData: FormData) {
  const supabase = await createSupabaseServer();

  const rawNext = String(formData.get("next") ?? "/dashboard");
  const next = rawNext.startsWith("/") ? rawNext : "/dashboard";
  const siteUrl = getServerSideURL();
  const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
    },
  });

  if (error) {
    redirect("/login?error=oauth_error");
  }

  if (data.url) {
    redirect(data.url);
  }

  redirect("/login?error=oauth_error");
}
