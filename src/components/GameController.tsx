'use client'

import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import gameAnimationData from '../../public/animations/game.json'
import { LottieAnimation } from './LottieAnimation'

interface GameControllerProps {
  className?: string
  delay?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function GameController({ className = '', delay = 0, size = 'md' }: GameControllerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Add delay if specified
    if (delay > 0) {
      const id = window.setTimeout(() => setIsLoaded(true), delay)
      return () => window.clearTimeout(id)
    } else {
      setIsLoaded(true)
    }
  }, [delay])

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-32 sm:h-32',
    md: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56',
    lg: 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72',
    xl: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96',
  } as const satisfies Record<'sm' | 'md' | 'lg' | 'xl', string>

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        {isLoaded ? (
          <LottieAnimation
            animationData={gameAnimationData}
            autoplay={!shouldReduceMotion}
            loop={!shouldReduceMotion}
            speed={1}
            className="h-full w-full"
          />
        ) : (
          <div className={`${sizeClasses[size]} bg-transparent`} />
        )}
      </div>
    </div>
  )
}
