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
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center bg-primary/20">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover -z-10"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 md:px-6 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md">
            {t('volunteer.title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90 drop-shadow-sm">
            {t('volunteer.description')}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">{t('volunteer.positionsTitle')}</h2>
            <Accordion type="single" collapsible className="w-full">
              {volunteerPositions.map((position, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-headline hover:no-underline">
                    {t(`volunteerPositions.${position.id}.title`)} <span className="text-sm font-body text-muted-foreground ml-4">({t(`volunteerPositions.${position.id}.location`)})</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <p className="text-muted-foreground">{t(`volunteerPositions.${position.id}.description`)}</p>
                    <h4 className="font-semibold">{t('volunteer.requirementsTitle')}:</h4>
                    <ul className="space-y-1 list-inside">
                      {position.requirements.map((reqKey, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" /> 
                          <span className="text-muted-foreground">{t(`volunteerPositions.${position.id}.requirements.${reqKey}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{t('volunteer.formTitle')}</CardTitle>
                <CardDescription>{t('volunteer.formDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('volunteer.formFirstNameLabel')}</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('volunteer.formLastNameLabel')}</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('volunteer.formEmailLabel')}</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('volunteer.formPhoneLabel')}</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">{t('volunteer.formPositionLabel')}</Label>
                  <Input id="position" placeholder="e.g., Event Staff" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('volunteer.formMotivationLabel')}</Label>
                  <Textarea id="message" placeholder={t('volunteer.formMotivationPlaceholder')} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{t('volunteer.formSubmitButton')}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
