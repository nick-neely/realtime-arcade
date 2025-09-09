'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'motion/react'

export function LoginFormSkeleton() {
  return (
    <motion.div
      role="status"
      aria-busy="true"
      aria-live="polite"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Header Section - Keep static text */}
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Welcome back</h1>
        <p className="text-muted-foreground text-lg">Sign in to your account</p>
      </div>

      {/* Login Form Card Skeleton */}
      <div className="bg-card mx-auto mb-16 w-full max-w-md space-y-6 border-2 border-black p-6 shadow-lg md:max-w-lg md:p-8 lg:max-w-xl lg:p-12">
        {/* GitHub Button Skeleton */}
        <Skeleton className="h-12 w-full animate-pulse" aria-hidden="true" />

        {/* Divider Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-2 border-black" />
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-card text-muted-foreground px-4 font-medium">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form Skeleton */}
        <div className="space-y-6">
          {/* Email Label Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-12 animate-pulse" aria-hidden="true" />
            <Skeleton className="h-12 w-full animate-pulse" aria-hidden="true" />
          </div>

          {/* Submit Button Skeleton */}
          <Skeleton className="h-12 w-full animate-pulse" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  )
}
