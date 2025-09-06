import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { login } from "@/app/login/actions";

export default async function LoginPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  // Replace with your custom form or Auth UI
  return (
    <main className="mx-auto max-w-sm pt-24">
      <form action={login} className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <Button type="submit" className="w-full">
          Send magic link
        </Button>
      </form>
    </main>
  );
}
