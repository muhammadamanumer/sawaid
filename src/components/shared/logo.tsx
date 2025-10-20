import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Sawaid Al islah Homepage">
      <img
        src="https://img.notionusercontent.com/s3/prod-files-secure%2F95988344-badb-4daa-8013-19c466f371f7%2F841403be-f6ba-4c88-935d-9f3b34776d06%2FWhatsApp_Image_2025-10-15_at_11.41.36_AM.jpeg/size/w=2000?exp=1760945605&sig=FHz007HSWiY30OtYpT5DNdKGo8tWaqpNsdzf0Gj-yeg&id=2914732f-17cc-8066-a318-e6fc20abb82b&table=block&userId=90cb780f-86ce-4aeb-881a-664101056505"
        alt="Sawaid Al islah Logo"
        className="h-8 w-8 object-contain"
      />
      <span className="text-xl font-headline font-bold text-primary-foreground">
        Sawaid Al islah
      </span>
    </Link>
  );
}
