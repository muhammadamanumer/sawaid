'use client';

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

type AnimatedProgressBarProps = {
  value: number;
};

export function AnimatedProgressBar({ value }: AnimatedProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress bar on mount
    const timer = setTimeout(() => setProgress(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return <Progress value={progress} className="h-3 w-full [&>div]:bg-accent" />;
}
