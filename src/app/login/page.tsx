import { LoginFormSkeleton } from '@/components/LoginFormSkeleton'
import { Store } from '@/components/Store'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoginForm = dynamic(() =>
  import('@/components/LoginForm').then((m) => ({
    default: m.LoginForm, // map named export
  })),
)

export default function LoginPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 pt-8 pb-8 md:max-w-3xl md:px-6 md:pt-16 lg:max-w-4xl lg:pt-24 xl:max-w-5xl">
      <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        {/* Store Animation - Hidden on mobile, shown on desktop to the left */}
        <div className="hidden lg:absolute lg:top-1/2 lg:-left-32 lg:block lg:-translate-y-1/2">
          <Store size="lg" delay={200} />
        </div>

        {/* Login Form - Always centered */}
        <div className="w-full max-w-md lg:max-w-lg">
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
