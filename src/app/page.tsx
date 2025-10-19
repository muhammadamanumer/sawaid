"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CampaignCard } from '@/components/campaign-card';
import { campaigns } from '@/lib/data';
import { ArrowRight, Heart, Users, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function Home() {
  const { t, isRtl } = useTranslation();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const featuredCampaigns = campaigns.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover -z-10"
                priority
                data-ai-hint={heroImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative max-w-4xl mx-auto text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md">
              {t('home.missionTitle')}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90 drop-shadow-sm">
              {t('home.missionStatement')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/donate">{t('home.donateNow')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                <Link href="/campaigns">{t('home.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Metrics Section */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 md:px-6">
             <h2 className="text-3xl font-headline font-bold text-center mb-8">{t('home.impactTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <TrendingUp className="h-12 w-12 mx-auto text-accent" />
                <p className="text-4xl font-bold mt-2">$1.2M+</p>
                <p className="text-muted-foreground mt-1">{t('home.fundsRaised')}</p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <Users className="h-12 w-12 mx-auto text-accent" />
                <p className="text-4xl font-bold mt-2">50,000+</p>
                <p className="text-muted-foreground mt-1">{t('home.peopleHelped')}</p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <Heart className="h-12 w-12 mx-auto text-accent" />
                <p className="text-4xl font-bold mt-2">5,000+</p>
                <p className="text-muted-foreground mt-1">{t('home.volunteers')}</p>
              </div>
            </div>
          </div>
        </section>


        {/* Featured Campaigns Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">{t('home.featuredCampaigns')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                    <Link href="/campaigns">
                        {t('home.viewAllCampaigns')} 
                        {isRtl ? <ArrowRight className="mr-2" /> : <ArrowRight className="ml-2" />}
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
