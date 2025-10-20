"use client"

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Heart, Target, Users, Globe, Award, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function AboutPage() {
  const { t } = useTranslation();
  const aboutHero = PlaceHolderImages.find(p => p.id === 'volunteer-hero');

  const values = [
    { icon: Heart, key: "compassion" },
    { icon: Target, key: "transparency" },
    { icon: Users, key: "collaboration" },
    { icon: Globe, key: "impact" }
  ];

  const team = [
    { id: "director", role: "Executive Director" },
    { id: "operations", role: "Director of Operations" },
    { id: "programs", role: "Head of Programs" },
    { id: "fundraising", role: "Fundraising Manager" }
  ];

  const partners = [
    { name: "UN Refugee Agency", type: "UN Partner" },
    { name: "International Red Cross", type: "Healthcare Partner" },
    { name: "Global Education Fund", type: "Education Partner" },
    { name: "Water.org", type: "Infrastructure Partner" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {aboutHero && (
          <Image
            src={aboutHero.imageUrl}
            alt={aboutHero.description}
            fill
            className="object-cover -z-10 scale-105"
            data-ai-hint={aboutHero.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/40" />
        
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 text-center text-primary-foreground z-10">
          <h1 className="text-5xl md:text-7xl font-headline font-bold drop-shadow-2xl animate-fadeInUp leading-tight">
            {t('about.title')}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-primary-foreground/95 drop-shadow-lg animate-fadeInUp animation-delay-200 leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission & History Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
              {t('about.missionTitle')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeInUp animation-delay-200">
            <div className="space-y-6">
              <h3 className="text-3xl font-headline font-bold">{t('about.historyTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.historyText1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.historyText2')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-base">
                  <Award className="h-4 w-4 mr-2" />
                  {t('about.founded')} 2015
                </Badge>
                <Badge className="bg-accent/10 text-accent-foreground hover:bg-accent/20 px-4 py-2 text-base">
                  <Globe className="h-4 w-4 mr-2" />
                  15+ {t('about.countries')}
                </Badge>
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-modern-2xl">
              {aboutHero && (
                <Image
                  src={aboutHero.imageUrl}
                  alt="Our History"
                  fill
                  className="object-cover"
                  data-ai-hint={aboutHero.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">{t('about.valuesTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.key} 
                className="text-center shadow-modern-lg border-border/50 animate-fadeInUp hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <CardHeader>
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{t(`about.values.${value.key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t(`about.values.${value.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
              {t('about.teamTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.teamSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={member.id} 
                className="overflow-hidden shadow-modern-lg border-border/50 animate-fadeInUp hover:shadow-modern-xl transition-all duration-500"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Users className="h-24 w-24 text-primary/30" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{t(`about.team.${member.id}.name`)}</CardTitle>
                  <CardDescription className="text-sm">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t(`about.team.${member.id}.bio`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">{t('about.partnersTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.partnersSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div 
                key={partner.name} 
                className="p-6 bg-background rounded-2xl border-2 border-border/50 shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-1 text-center animate-fadeInUp"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="h-16 flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Registration Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto shadow-modern-2xl border-border/50 animate-fadeInUp">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                {t('about.legalTitle')}
              </CardTitle>
              <CardDescription className="text-base">{t('about.legalSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h4 className="font-bold mb-2">{t('about.legal.registration')}</h4>
                  <p className="text-sm text-muted-foreground">501(c)(3) Non-Profit Organization</p>
                  <p className="text-sm text-muted-foreground mt-1">EIN: XX-XXXXXXX</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h4 className="font-bold mb-2">{t('about.legal.location')}</h4>
                  <p className="text-sm text-muted-foreground">Headquarters: United States</p>
                  <p className="text-sm text-muted-foreground mt-1">Global Operations</p>
                </div>
              </div>
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  {t('about.legal.taxDeductible')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

