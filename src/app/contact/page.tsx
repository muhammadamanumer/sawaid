"use client"

import { Mail, Phone, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { faqItems } from "@/lib/data";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from "@/hooks/use-translation";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-headline font-bold animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent">
            {t('contact.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fadeInUp animation-delay-100">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 animate-fadeInUp animation-delay-200">
          <div className="lg:col-span-3">
             <Card className="w-full shadow-modern-2xl border-border/50">
              <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">{t('contact.formTitle')}</CardTitle>
                <CardDescription className="text-base">{t('contact.formDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2.5">
                    <Label htmlFor="name" className="font-semibold">{t('contact.formNameLabel')}</Label>
                    <Input id="name" placeholder={t('contact.formNamePlaceholder')} className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="email" className="font-semibold">{t('contact.formEmailLabel')}</Label>
                    <Input id="email" type="email" placeholder={t('contact.formEmailPlaceholder')} className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="subject" className="font-semibold">{t('contact.formSubjectLabel')}</Label>
                  <Input id="subject" placeholder={t('contact.formSubjectPlaceholder')} className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="message" className="font-semibold">{t('contact.formMessageLabel')}</Label>
                  <Textarea id="message" placeholder={t('contact.formMessagePlaceholder')} rows={6} className="rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md resize-none" />
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="accent" className="w-full h-14 text-lg shadow-modern-xl hover:shadow-modern-2xl">{t('contact.formSendButton')}</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border/50 shadow-modern-lg">
              <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                {t('contact.infoTitle')}
                <span className="h-0.5 w-12 bg-accent rounded-full"></span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary-lightest rounded-xl group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t('contact.hqTitle')}</h3>
                    <p className="text-muted-foreground text-sm">123 Hope Street, Unity City, 10001, World</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary-lightest rounded-xl group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t('contact.emailSupportTitle')}</h3>
                    <a href="mailto:support@hopeharbor.org" className="text-muted-foreground text-sm hover:text-primary transition-colors">support@hopeharbor.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary-lightest rounded-xl group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t('contact.phoneSupportTitle')}</h3>
                    <a href="tel:+1234567890" className="text-muted-foreground text-sm hover:text-primary transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 rounded-3xl border border-border/50 shadow-modern-lg">
              <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                {t('contact.followUsTitle')}
                <span className="h-0.5 w-12 bg-accent rounded-full"></span>
              </h2>
              <div className="flex gap-4">
                <Link href="#" aria-label="Facebook" className="p-3 bg-background rounded-xl text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-modern hover:shadow-modern-md">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="Twitter" className="p-3 bg-background rounded-xl text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-modern hover:shadow-modern-md">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="Instagram" className="p-3 bg-background rounded-xl text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-modern hover:shadow-modern-md">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 animate-fadeInUp animation-delay-400">
           <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">{t('contact.faqTitle')}</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              {t('contact.faqDescription')}
            </p>
          </div>
           <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-2 border-border/50 rounded-2xl px-6 shadow-modern hover:shadow-modern-lg transition-all bg-background/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-lg text-left font-bold hover:no-underline py-6 hover:text-primary transition-colors">
                    {t(`faq.${item.id}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2 pb-6 leading-relaxed">
                    {t(`faq.${item.id}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </div>
    </div>
  );
}
