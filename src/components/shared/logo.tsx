import Link from 'next/link';
import Image from 'next/image';
import { organizationInfo } from '@/config/organization';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Sawaid Al Islah Homepage">
      <div className="relative h-16 w-20 flex-shrink-0 bg-white ">
        <Image
          src="/Logo/logo-sawaid.svg"
          alt="Sawaid Al Islah Logo"
          fill
          className="object-contain drop-shadow-md"
          priority
        />
      </div>
      <span className="text-xl md:text-2xl font-sawaid-arabic font-bold text-primary-foreground transition-colors duration-300 group-hover:text-accent" dir="rtl">
        {organizationInfo.name.ar}
      </span>
    </Link>
  );
}
