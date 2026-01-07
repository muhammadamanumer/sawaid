"use client";

import { DonateForm, DonateFormCampaign } from "@/components/donate-form";
import { useTranslation } from "@/hooks/use-translation";

interface DonateClientProps {
  campaigns: DonateFormCampaign[];
}

export function DonateClient({ campaigns }: DonateClientProps) {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-16 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-headline font-bold animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent">
            {t('donate.title')}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fadeInUp animation-delay-100">
            {t('donate.description')}
          </p>
        </div>
        
        <div className="animate-fadeInUp animation-delay-200">
          <DonateForm campaigns={campaigns} />
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-8 animate-fadeInUp animation-delay-300">
          {t('donate.footer')}
        </p>
      </div>
    </div>
  );
}
