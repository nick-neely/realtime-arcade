"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

export function LoginFormSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Header Section - Keep static text */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-lg">Sign in to your account</p>
      </div>

      {/* Login Form Card Skeleton */}
      <div className="bg-card border-2 border-black shadow-lg p-6 md:p-8 lg:p-12 space-y-6 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        {/* GitHub Button Skeleton */}
        <Skeleton className="h-12 w-full" />

        {/* Divider Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-2 border-black" />
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-card px-4 text-muted-foreground font-medium">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form Skeleton */}
        <div className="space-y-6">
          {/* Email Label Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Submit Button Skeleton */}
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </motion.div>
  );
}
