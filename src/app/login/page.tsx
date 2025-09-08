import { LoginFormSkeleton } from '@/components/LoginFormSkeleton'
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
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </section>
  )
}
