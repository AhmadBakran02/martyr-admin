"use client";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  loading?: boolean;
}

export default function AnimatedCounter({
  value,
  duration = 1000,
  loading = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loading) {
      // Simulate looping count while loading
      let i = 0;
      const timer = setInterval(() => {
        i = (i + 1) % 100; // loop 0 → 99
        setCount(i);
      }, 40); // fast animation
      return () => clearInterval(timer);
    } else {
      // Animate to final value
      let start = 0;
      const end = value;
      const incrementTime = 10;
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
    }
  }, [value, duration, loading]);

  return <>{count}</>;
}
