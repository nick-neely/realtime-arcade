"use client";

import { useEffect, useState } from "react";
import { LottieAnimation } from "./LottieAnimation";

interface StarsRatingProps {
  className?: string;
  delay?: number;
}

export function StarsRating({ className = "", delay = 0 }: StarsRatingProps) {
  const [animationData, setAnimationData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load the animation data
    const loadAnimation = async () => {
      try {
        const response = await fetch("/animations/stars-rating.json");
        const data = await response.json();
        setAnimationData(data);

        // Add delay if specified
        if (delay > 0) {
          setTimeout(() => setIsLoaded(true), delay);
        } else {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load stars animation:", error);
        // Fallback to static star if animation fails to load
        setIsLoaded(true);
      }
    };

    loadAnimation();
  }, [delay]);

  // Show just the text until animation is loaded to prevent flash
  if (!isLoaded || !animationData) {
    return (
      <div className={`flex items-center ${className}`}>
        <span>4.9/5 rating</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-4 w-16">
        <LottieAnimation
          animationData={animationData}
          autoplay={true}
          loop={false}
          speed={1}
        />
      </div>
      <span className="ml-1">4.9/5 rating</span>
    </div>
  );
}
