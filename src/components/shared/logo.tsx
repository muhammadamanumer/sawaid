import { HandHeart } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Sawaid Al islah Homepage">
      <HandHeart className="h-8 w-8 text-accent" />
      <span className="text-xl font-headline font-bold text-primary-foreground">
        Sawaid Al islah
      </span>
    </Link>
  );
}
