import Image from 'next/image';
import { notFound } from 'next/navigation';
import { campaigns } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedProgressBar } from '@/components/progress-bar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { i18n } from '@/i18n-config';
import type { Locale } from '@/i18n-config';

export async function generateStaticParams() {
  const paths = campaigns.flatMap(campaign => 
    i18n.locales.map(locale => ({
      lang: locale,
      slug: campaign.slug
    }))
  );
  return paths;
}

export default function CampaignDetailPage({ params }: { params: { slug: string, lang: Locale } }) {
  const campaign = campaigns.find((c) => c.slug === params.slug);

  if (!campaign) {
    notFound();
  }

  const progress = (campaign.currentAmount / campaign.goal) * 100;
  const mainImage = PlaceHolderImages.find(p => p.id === campaign.image);

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {mainImage && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image
                    src={mainImage.imageUrl}
                    alt={mainImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={mainImage.imageHint}
                    />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-headline font-bold">{campaign.title}</h1>
              <p className="text-lg text-muted-foreground">{campaign.description}</p>
              
              {campaign.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-headline font-semibold mb-4">Gallery</h2>
                   <Carousel className="w-full">
                    <CarouselContent className="-ml-2">
                      {campaign.gallery.map((imageId, index) => {
                        const img = PlaceHolderImages.find(p => p.id === imageId);
                        return img ? (
                          <CarouselItem key={index} className="pl-2 md:basis-1/2">
                            <div className="p-1">
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                  <Image
                                    src={img.imageUrl}
                                    alt={img.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={img.imageHint}
                                  />
                                </div>
                            </div>
                          </CarouselItem>
                        ) : null;
                      })}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12" />
                    <CarouselNext className="mr-12" />
                  </Carousel>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatedProgressBar value={progress} />
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-foreground">${campaign.currentAmount.toLocaleString()}</span>
                  <span className="text-muted-foreground">raised of ${campaign.goal.toLocaleString()}</span>
                </div>
                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl">
                  <Link href="/donate">Donate to this Campaign</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Recent Donors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaign.donors.map((donor, index) => {
                  const donorAvatar = PlaceHolderImages.find(p => p.id === donor.avatar);
                  return (
                    <div key={index} className="flex items-center gap-4">
                       <Avatar>
                        {donorAvatar && <AvatarImage src={donorAvatar.imageUrl} alt={donor.name} data-ai-hint={donorAvatar.imageHint}/>}
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{donor.name}</p>
                        <p className="text-sm text-muted-foreground">Donated ${donor.amount}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
