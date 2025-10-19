"use client"
import { DonateForm } from "@/components/donate-form";
import { useTranslation } from "@/hooks/use-translation";

export default function DonatePage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('donate.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('donate.description')}</p>
      </div>
      <DonateForm />
      <p className="text-center text-sm text-muted-foreground mt-4">
        {t('donate.footer')}
      </p>
    </div>
  );
}
