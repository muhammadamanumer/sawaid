import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Sawaid Al Islah Homepage">
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image
          src="/Logo/sawaid-logo-radius.webp"
          alt="Sawaid Al Islah Logo"
          fill
          className="object-contain drop-shadow-md"
          priority
        />
      </div>
      <span className="text-xl md:text-2xl font-headline font-bold text-primary-foreground transition-colors duration-300 group-hover:text-accent">
        Sawaid Al Islah
      </span>
    </Link>
  );
}
