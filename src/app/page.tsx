import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, HeartHandshake, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/campaign-card';
import { campaigns } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center bg-primary/20">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 md:px-6 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md">
            Restoring Hope, Rebuilding Lives
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90 drop-shadow-sm">
            Join HopeHarbor in providing critical aid and long-term solutions to communities in crisis around the globe.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/campaigns">View Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="campaigns" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ongoing Campaigns</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Your support can make a world of difference. Explore our active campaigns and find a cause that speaks to you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.slice(0, 3).map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-accent text-lg">
              <Link href="/campaigns">
                See All Campaigns <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="how-we-help" className="py-12 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">How We Make a Difference</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Our approach is holistic, focusing on immediate relief and sustainable development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-accent/20 rounded-full p-4">
                <HeartHandshake className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Humanitarian Aid</h3>
              <p className="text-muted-foreground">Delivering food, water, and medical supplies in emergencies.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-accent/20 rounded-full p-4">
                <BookOpen className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Education Programs</h3>
              <p className="text-muted-foreground">Providing access to education for children in disadvantaged areas.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-accent/20 rounded-full p-4">
                <ShieldCheck className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Sustainable Projects</h3>
              <p className="text-muted-foreground">Building long-term solutions like clean water wells and schools.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Change a Life?</h2>
          <p className="mt-4 max-w-xl mx-auto">
            Every contribution, big or small, creates a ripple of hope. Join us today.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
            <Link href="/donate">Become a Donor</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
