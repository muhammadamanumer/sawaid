"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CampaignCard } from "@/components/campaign-card";
import { campaigns } from "@/lib/data";
import {
  ArrowRight,
  Heart,
  Users,
  TrendingUp,
  DollarSign,
  HandHeart,
  Megaphone,
  Share2,
  GraduationCap,
  Droplets,
  Stethoscope,
  Clock,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
export default function Home() {
  const { t } = useTranslation();
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-home");
  const featuredCampaigns = campaigns.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10 scale-105"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/40" />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
          </div>

          <div className="relative max-w-5xl mx-auto text-primary-foreground z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold drop-shadow-2xl animate-fadeInUp leading-tight">
              {t("home.missionTitle")}
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/95 drop-shadow-lg animate-fadeInUp animation-delay-200 leading-relaxed">
              {t("home.missionStatement")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center animate-fadeInUp animation-delay-400">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="shadow-modern-xl hover:scale-105 transition-all"
              >
                <Link href="/donate">{t("home.donateNow")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/80 text-primary-foreground bg-transparent hover:bg-primary-foreground/20 shadow-modern-lg backdrop-blur-sm hover:scale-105 transition-all"
              >
                <Link href="/campaigns">{t("home.learnMore")}</Link>
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary-foreground/50 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Impact Metrics Section */}
        <section className="relative bg-gradient-to-br from-muted via-background to-muted py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 animate-fadeInUp">
              {t("home.impactTitle")}
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
              Making a real difference in communities around the world
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-modern-lg hover:shadow-modern-xl transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-200 hover:-translate-y-2">
                <div className="inline-flex p-4 bg-gradient-to-br from-accent-lightest to-accent-lighter rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp className="h-12 w-12 text-accent" />
                </div>
                <p className="text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                  $1.2M+
                </p>
                <p className="text-muted-foreground mt-3 font-medium">
                  {t("home.fundsRaised")}
                </p>
              </div>
              <div className="group p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-modern-lg hover:shadow-modern-xl transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-300 hover:-translate-y-2">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <p className="text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                  50,000+
                </p>
                <p className="text-muted-foreground mt-3 font-medium">
                  {t("home.peopleHelped")}
                </p>
              </div>
              <div className="group p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-modern-lg hover:shadow-modern-xl transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-400 hover:-translate-y-2">
                <div className="inline-flex p-4 bg-gradient-to-br from-accent-lightest to-accent-lighter rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Heart className="h-12 w-12 text-accent" />
                </div>
                <p className="text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                  5,000+
                </p>
                <p className="text-muted-foreground mt-3 font-medium">
                  {t("home.volunteers")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgent Appeals Section */}
        <section className="relative py-24 bg-gradient-to-br from-destructive/5 via-background to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4 animate-fadeInUp">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Time Sensitive
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp animation-delay-100">
                {t("home.urgentAppealsTitle")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
                {t("home.urgentAppealsSubtitle")}
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="border-destructive/20 shadow-modern-xl hover:shadow-modern-2xl transition-all duration-500 overflow-hidden group animate-fadeInUp animation-delay-300">
                <div className="relative h-64 overflow-hidden">
                  {campaigns[0] &&
                    PlaceHolderImages.find(
                      (p) => p.id === campaigns[0].image
                    ) && (
                      <Image
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === campaigns[0].image
                          )!.imageUrl
                        }
                        alt="Urgent campaign"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    URGENT
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t(`campaigns.${campaigns[0].slug}.title`)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t(`campaigns.${campaigns[0].slug}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">
                          ${campaigns[0].currentAmount.toLocaleString()} raised
                        </span>
                        <span className="text-muted-foreground">
                          ${campaigns[0].goal.toLocaleString()} goal
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                          style={{
                            width: `${Math.min(
                              (campaigns[0].currentAmount / campaigns[0].goal) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full"
                      size="lg"
                      variant="default"
                    >
                      <Link href={`/campaigns/${campaigns[0].slug}`}>
                        Donate Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Campaigns Section */}
        <section className="relative py-24 bg-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp">
                {t("home.featuredCampaigns")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                Join us in making a lasting impact through these meaningful
                initiatives
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredCampaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
            </div>
            <div className="text-center mt-16 animate-fadeInUp animation-delay-500">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group shadow-modern-md hover:shadow-modern-lg"
              >
                <Link href="/campaigns">
                  {t("home.viewAllCampaigns")}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ways to Help Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp">
                {t("home.waysToHelpTitle")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                {t("home.waysToHelpSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-200">
                <CardHeader className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <DollarSign className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t("home.ways.donate.title")}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t("home.ways.donate.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn"
                  >
                    <Link href="/donate">
                      Donate
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-300">
                <CardHeader className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-br from-accent-lightest to-accent-lighter rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <HandHeart className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl">
                    {t("home.ways.volunteer.title")}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t("home.ways.volunteer.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn"
                  >
                    <Link href="/volunteer">
                      Join Us
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-400">
                <CardHeader className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <Megaphone className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t("home.ways.fundraise.title")}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t("home.ways.fundraise.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn"
                  >
                    <Link href="/campaigns">
                      Start Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-500">
                <CardHeader className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-br from-accent-lightest to-accent-lighter rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <Share2 className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl">
                    {t("home.ways.spread.title")}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t("home.ways.spread.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn"
                  >
                    <Link href="/about">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="relative py-24 bg-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp">
                {t("home.storiesTitle")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                {t("home.storiesSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Story 1 */}
              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fadeInUp animation-delay-200">
                <div className="relative h-48 overflow-hidden">
                  {PlaceHolderImages.find(
                    (p) => p.id === "campaign-education-support"
                  ) && (
                    <Image
                      src={
                        PlaceHolderImages.find(
                          (p) => p.id === "campaign-education-support"
                        )!.imageUrl
                      }
                      alt="Education success story"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-lg">
                      {t("home.stories.education.name")}
                    </p>
                    <p className="text-sm text-white/90">
                      {t("home.stories.education.role")}
                    </p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2 mb-4">
                    <GraduationCap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{t("home.stories.education.quote")}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Story 2 */}
              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fadeInUp animation-delay-300">
                <div className="relative h-48 overflow-hidden">
                  {PlaceHolderImages.find(
                    (p) => p.id === "campaign-clean-water"
                  ) && (
                    <Image
                      src={
                        PlaceHolderImages.find(
                          (p) => p.id === "campaign-clean-water"
                        )!.imageUrl
                      }
                      alt="Water success story"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-lg">
                      {t("home.stories.water.name")}
                    </p>
                    <p className="text-sm text-white/90">
                      {t("home.stories.water.role")}
                    </p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2 mb-4">
                    <Droplets className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{t("home.stories.water.quote")}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Story 3 */}
              <Card className="group hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fadeInUp animation-delay-400">
                <div className="relative h-48 overflow-hidden">
                  {PlaceHolderImages.find(
                    (p) => p.id === "campaign-medical-aid"
                  ) && (
                    <Image
                      src={
                        PlaceHolderImages.find(
                          (p) => p.id === "campaign-medical-aid"
                        )!.imageUrl
                      }
                      alt="Medical success story"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-lg">
                      {t("home.stories.medical.name")}
                    </p>
                    <p className="text-sm text-white/90">
                      {t("home.stories.medical.role")}
                    </p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2 mb-4">
                    <Stethoscope className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{t("home.stories.medical.quote")}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="relative py-24 bg-gradient-to-br from-muted via-background to-muted overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-fadeInUp">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      100% Transparency
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold">
                    {t("home.transparencyTitle")}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t("home.transparencySubtitle")}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Annual Financial Reports
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Detailed breakdown of all funds and expenditures
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Real-Time Impact Tracking
                        </p>
                        <p className="text-sm text-muted-foreground">
                          See exactly how your donations create change
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Independent Audits</p>
                        <p className="text-sm text-muted-foreground">
                          Third-party verification of our operations
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button asChild size="lg" className="mt-8">
                    <Link href="/transparency">
                      {t("home.viewReports")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="relative animate-fadeInUp animation-delay-200">
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-modern-xl">
                    {PlaceHolderImages.find(
                      (p) => p.id === "transparency-report"
                    ) && (
                      <Image
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === "transparency-report"
                          )!.imageUrl
                        }
                        alt="Financial transparency"
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-modern-xl max-w-xs">
                    <p className="text-4xl font-bold">85%</p>
                    <p className="text-sm">
                      of donations go directly to programs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 animate-fadeInUp">
                {t("home.newsletterTitle")}
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90 animate-fadeInUp animation-delay-100">
                {t("home.newsletterSubtitle")}
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fadeInUp animation-delay-200">
                <Input
                  type="email"
                  placeholder={t("home.newsletterPlaceholder")}
                  className="flex-1 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/20"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="accent"
                  className="shadow-modern-lg"
                >
                  {t("home.newsletterButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
