"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // optional, defaults to 1000ms
}

export default function AnimatedCounter({
  value,
  duration = 1000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const incrementTime = 10; // ms per frame
    const totalSteps = duration / incrementTime;
    const step = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
}
