'use client'

import { useEffect, useState } from 'react'
import starsAnimationData from '../../public/animations/stars-rating.json'
import { LottieAnimation } from './LottieAnimation'

interface StarsRatingProps {
  className?: string
  delay?: number
}

export function StarsRating({ className = '', delay = 0 }: StarsRatingProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add delay if specified
    if (delay > 0) {
      const id = window.setTimeout(() => setIsLoaded(true), delay)
      return () => window.clearTimeout(id)
    } else {
      setIsLoaded(true)
    }
  }, [delay])

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex h-4 w-16 items-center justify-center">
        {isLoaded ? (
          <LottieAnimation
            animationData={starsAnimationData}
            autoplay={true}
            loop={false}
            speed={1}
            className="mt-3"
          />
        ) : (
          <span className="text-xs opacity-0">4.9</span>
        )}
      </div>
      <span className="ml-1">4.9/5 rating</span>
    </div>
  )
}
