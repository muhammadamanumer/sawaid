import { HandHeart } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="HopeHarbor Homepage">
      <HandHeart className="h-8 w-8 text-accent" />
      <span className="text-2xl font-headline font-bold text-primary-foreground">
        HopeHarbor
      </span>
    </Link>
  );
}
