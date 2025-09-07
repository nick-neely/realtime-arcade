"use client";

import Lottie from "lottie-react";
import { useEffect, useRef } from "react";

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  onComplete?: () => void;
}

export function LottieAnimation({
  animationData,
  className = "",
  autoplay = true,
  loop = false,
  speed = 1,
  onComplete,
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current && typeof speed === "number") {
      try {
        lottieRef.current.setSpeed(speed);
      } catch {
        // ignore if ref not ready
      }
    }
  }, [speed]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      className={className}
      loop={loop}
      autoplay={autoplay}
      onComplete={onComplete}
    />
  );
}
