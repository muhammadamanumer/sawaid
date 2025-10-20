"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { volunteerPositions } from "@/lib/data";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function VolunteerPage() {
  const { t } = useTranslation();
  const heroImage = PlaceHolderImages.find(p => p.id === 'volunteer-hero');

  return (
    <div>
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover -z-10 scale-105"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/40" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 text-center text-primary-foreground z-10">
          <h1 className="text-5xl md:text-7xl font-headline font-bold drop-shadow-2xl animate-fadeInUp leading-tight">
            {t('volunteer.title')}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-primary-foreground/95 drop-shadow-lg animate-fadeInUp animation-delay-200 leading-relaxed">
            {t('volunteer.description')}
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
              {t('volunteer.positionsTitle')}
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {volunteerPositions.map((position, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 border-border/50 rounded-2xl px-6 shadow-modern hover:shadow-modern-lg transition-all bg-background/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-xl font-headline hover:no-underline py-6 hover:text-primary transition-colors">
                    <span className="flex-1 text-left">
                      {t(`volunteerPositions.${position.id}.title`)}
                    </span>
                    <span className="text-sm font-body text-muted-foreground ml-4 mr-4">
                      ({t(`volunteerPositions.${position.id}.location`)})
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{t(`volunteerPositions.${position.id}.description`)}</p>
                    <h4 className="font-bold text-foreground">{t('volunteer.requirementsTitle')}:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((reqKey, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" /> 
                          <span className="text-muted-foreground">{t(`volunteerPositions.${position.id}.requirements.${reqKey}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="lg:sticky lg:top-24 animate-fadeInUp animation-delay-200">
            <Card className="w-full shadow-modern-2xl border-border/50">
              <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                  {t('volunteer.formTitle')}
                </CardTitle>
                <CardDescription className="text-base">{t('volunteer.formDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2.5">
                    <Label htmlFor="firstName" className="font-semibold">{t('volunteer.formFirstNameLabel')}</Label>
                    <Input id="firstName" placeholder="John" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="lastName" className="font-semibold">{t('volunteer.formLastNameLabel')}</Label>
                    <Input id="lastName" placeholder="Doe" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="font-semibold">{t('volunteer.formEmailLabel')}</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="phone" className="font-semibold">{t('volunteer.formPhoneLabel')}</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="position" className="font-semibold">{t('volunteer.formPositionLabel')}</Label>
                  <Input id="position" placeholder="e.g., Event Staff" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="message" className="font-semibold">{t('volunteer.formMotivationLabel')}</Label>
                  <Textarea id="message" placeholder={t('volunteer.formMotivationPlaceholder')} rows={5} className="rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md resize-none" />
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="accent" className="w-full h-14 text-lg shadow-modern-xl hover:shadow-modern-2xl">{t('volunteer.formSubmitButton')}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
