"use client";

import Lottie from "lottie-react";
import { useRef } from "react";

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

  const defaultOptions = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      className={className}
      loop={loop}
      autoplay={autoplay}
      speed={speed}
      onComplete={onComplete}
    />
  );
}
