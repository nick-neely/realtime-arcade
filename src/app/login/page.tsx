import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { LoginFormSkeleton } from "./LoginFormSkeleton";

export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl pt-8 md:pt-16 lg:pt-24 pb-8 flex-1 flex flex-col justify-center px-4 md:px-6">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
