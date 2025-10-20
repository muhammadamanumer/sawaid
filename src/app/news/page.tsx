"use client"

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function NewsPage() {
  const { t } = useTranslation();

  const newsArticles = [
    {
      id: "winter-relief-2024",
      category: "field-report",
      featured: true,
      date: "2024-01-15",
      author: "Field Team",
      image: PlaceHolderImages.find(p => p.id === 'volunteer-hero')
    },
    {
      id: "education-milestone",
      category: "success-story",
      featured: true,
      date: "2024-01-10",
      author: "Programs Director",
      image: PlaceHolderImages.find(p => p.id === 'hero-home')
    },
    {
      id: "water-project-complete",
      category: "project-update",
      featured: false,
      date: "2024-01-05",
      author: "Infrastructure Team",
      image: PlaceHolderImages.find(p => p.id === 'campaign-1')
    },
    {
      id: "volunteer-spotlight",
      category: "volunteer-story",
      featured: false,
      date: "2023-12-28",
      author: "Volunteer Coordinator",
      image: PlaceHolderImages.find(p => p.id === 'campaign-2')
    },
    {
      id: "annual-impact-report",
      category: "announcement",
      featured: false,
      date: "2023-12-20",
      author: "Executive Director",
      image: PlaceHolderImages.find(p => p.id === 'campaign-3')
    },
    {
      id: "new-partnership",
      category: "announcement",
      featured: false,
      date: "2023-12-15",
      author: "Partnerships Team",
      image: PlaceHolderImages.find(p => p.id === 'volunteer-hero')
    }
  ];

  const categories = [
    { key: "all", color: "bg-muted" },
    { key: "field-report", color: "bg-primary/10 text-primary" },
    { key: "success-story", color: "bg-accent/10 text-accent-foreground" },
    { key: "project-update", color: "bg-blue-100 text-blue-700" },
    { key: "volunteer-story", color: "bg-purple-100 text-purple-700" },
    { key: "announcement", color: "bg-green-100 text-green-700" }
  ];

  const featuredArticles = newsArticles.filter(article => article.featured);
  const recentArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent leading-tight">
            {t('news.title')}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fadeInUp animation-delay-100">
            {t('news.subtitle')}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fadeInUp animation-delay-200">
          {categories.map((category) => (
            <Badge 
              key={category.key}
              className={`px-6 py-2.5 cursor-pointer transition-all duration-300 hover:scale-105 ${category.color}`}
            >
              {t(`news.categories.${category.key}`)}
            </Badge>
          ))}
        </div>

        {/* Featured Articles */}
        <section className="mb-20 animate-fadeInUp animation-delay-300">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-headline font-bold">{t('news.featured')}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <Card 
                key={article.id}
                className="group overflow-hidden shadow-modern-2xl border-border/50 hover:shadow-modern-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  {article.image && (
                    <Image
                      src={article.image.imageUrl}
                      alt={article.image.description}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={article.image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Badge className={`absolute top-4 right-4 ${categories.find(c => c.key === article.category)?.color}`}>
                    {t(`news.categories.${article.category}`)}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-headline leading-tight group-hover:text-primary transition-colors">
                    {t(`news.articles.${article.id}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`news.articles.${article.id}.excerpt`)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                    <span className="group-hover/btn:text-primary transition-colors">
                      {t('news.readMore')}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="animate-fadeInUp animation-delay-500">
          <h2 className="text-3xl font-headline font-bold mb-8">{t('news.recent')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, index) => (
              <Card 
                key={article.id}
                className="group overflow-hidden shadow-modern-lg border-border/50 hover:shadow-modern-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  {article.image && (
                    <Image
                      src={article.image.imageUrl}
                      alt={article.image.description}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={article.image.imageHint}
                    />
                  )}
                  <Badge className={`absolute top-4 right-4 ${categories.find(c => c.key === article.category)?.color}`}>
                    {t(`news.categories.${article.category}`)}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  <CardTitle className="text-lg font-headline leading-tight group-hover:text-primary transition-colors">
                    {t(`news.articles.${article.id}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {t(`news.articles.${article.id}.excerpt`)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent text-sm">
                    <span className="group-hover/btn:text-primary transition-colors">
                      {t('news.readMore')}
                    </span>
                    <ArrowRight className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 animate-fadeInUp animation-delay-700">
          <Card className="shadow-modern-2xl border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                {t('news.newsletter.title')}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {t('news.newsletter.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={t('news.newsletter.placeholder')}
                  className="flex-1 h-12 rounded-xl border-2 border-border/50 px-4 shadow-modern transition-all focus:shadow-modern-md focus:border-primary outline-none"
                />
                <Button variant="accent" className="h-12 px-8 shadow-modern-md hover:shadow-modern-lg">
                  {t('news.newsletter.subscribe')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

