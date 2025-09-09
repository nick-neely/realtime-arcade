'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Client wrapper for server components
export function ThemeSwitcherWrapper() {
  return <ThemeSwitcher />
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'
  const isSystem = theme === 'system'

  const toggleTheme = () => {
    if (isSystem) {
      setTheme('light')
    } else if (isDark) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const getAriaLabel = () => {
    if (isSystem) {
      return 'Switch to light theme (currently using system theme)'
    } else if (isDark) {
      return 'Switch to light theme (currently using dark theme)'
    } else {
      return 'Switch to dark theme (currently using light theme)'
    }
  }

  const getTooltipText = () => {
    if (isSystem) {
      return 'System theme'
    } else if (isDark) {
      return 'Dark theme'
    } else {
      return 'Light theme'
    }
  }

  return (
    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild>
        <div className="relative">
          <motion.button
            onClick={toggleTheme}
            aria-label={getAriaLabel()}
            role="switch"
            className={cn(
              // Base brutalist styling
              'relative border-2 shadow-lg',
              'flex items-center justify-center',
              'transition-all duration-200',
              // Light theme styling
              'bg-background border-black text-black',
              // Dark theme styling
              'dark:bg-background dark:border-white dark:text-white',
              // Hover effects with brutalist shadows
              'hover:-translate-y-1 hover:shadow-xl',
              'active:translate-x-0 active:translate-y-0 active:shadow-md',
              // Focus styles for keyboard navigation
              'focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
            )}
            whileHover={{
              scale: 1.05,
              boxShadow: '6px 6px 0px 0px hsl(0 0% 0% / 1)',
            }}
            whileTap={{
              scale: 0.95,
              x: 2,
              y: 2,
              boxShadow: '2px 2px 0px 0px hsl(0 0% 0% / 1)',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="relative flex h-12 w-20 items-center">
              {/* Background slider */}
              <motion.div
                className={cn(
                  'absolute h-8 w-8 border-2 shadow-sm',
                  isDark ? 'bg-primary border-black' : 'bg-secondary border-black',
                )}
                animate={{
                  x: isDark ? 40 : 8,
                  backgroundColor: isDark
                    ? 'oklch(0.7044 0.1872 23.1858)' // dark primary
                    : 'oklch(0.968 0.211 109.7692)', // light secondary
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />

              {/* Sun Icon */}
              <motion.div
                className="absolute left-2 flex h-8 w-8 items-center justify-center"
                animate={{
                  opacity: isDark ? 0.3 : 1,
                  scale: isDark ? 0.8 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                aria-hidden="true"
              >
                <Sun
                  className={cn('h-5 w-5 transition-colors', isDark ? 'text-white' : 'text-black')}
                />
              </motion.div>

              {/* Moon Icon */}
              <motion.div
                className="absolute right-2 flex h-8 w-8 items-center justify-center"
                animate={{
                  opacity: isDark ? 1 : 0.3,
                  scale: isDark ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                aria-hidden="true"
              >
                <Moon
                  className={cn('h-5 w-5 transition-colors', isDark ? 'text-white' : 'text-black')}
                />
              </motion.div>
            </div>
          </motion.button>

          {/* Theme indicator dots */}
          <div
            className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 space-x-1"
            aria-hidden="true"
          >
            <motion.div
              className={cn(
                'h-2 w-2 border shadow-sm',
                'dark:bg-accent dark:border-white',
                'bg-accent border-black',
              )}
              animate={{
                opacity: isSystem ? 0.5 : isDark ? 0.3 : 1,
                scale: isSystem ? 0.8 : isDark ? 0.8 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className={cn(
                'h-2 w-2 border shadow-sm',
                'dark:bg-primary dark:border-white',
                'bg-primary border-black',
              )}
              animate={{
                opacity: isSystem ? 0.5 : isDark ? 1 : 0.3,
                scale: isSystem ? 0.8 : isDark ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="border-2 border-black shadow-lg" sideOffset={8}>
        <p className="text-sm font-medium">{getTooltipText()}</p>
      </TooltipContent>
    </Tooltip>
  )
}
