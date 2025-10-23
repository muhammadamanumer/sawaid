"use client"

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Image as ImageIcon, Video, Download, Play } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

// Format date consistently for SSR and client
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function GalleryPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const mediaItems = [
    {
      id: "emergency-food-1",
      type: "photo",
      category: "field-work",
      title: "Emergency Food Distribution",
      location: "Syria Border Region",
      date: "2024-01-15",
      image: PlaceHolderImages.find(p => p.id === 'campaign-1')
    },
    {
      id: "water-well-1",
      type: "photo",
      category: "infrastructure",
      title: "New Water Well Completion",
      location: "Rural Yemen",
      date: "2024-01-10",
      image: PlaceHolderImages.find(p => p.id === 'campaign-2')
    },
    {
      id: "education-1",
      type: "photo",
      category: "education",
      title: "School Supply Distribution",
      location: "Palestinian Territories",
      date: "2024-01-05",
      image: PlaceHolderImages.find(p => p.id === 'campaign-3')
    },
    {
      id: "volunteer-event-1",
      type: "photo",
      category: "events",
      title: "Volunteer Training Session",
      location: "Headquarters",
      date: "2023-12-28",
      image: PlaceHolderImages.find(p => p.id === 'volunteer-hero')
    },
    {
      id: "medical-aid-1",
      type: "photo",
      category: "field-work",
      title: "Mobile Medical Clinic",
      location: "Lebanon Refugee Camp",
      date: "2023-12-20",
      image: PlaceHolderImages.find(p => p.id === 'hero-home')
    },
    {
      id: "winter-relief-video",
      type: "video",
      category: "field-work",
      title: "Winter Relief Campaign 2024",
      location: "Northern Syria",
      date: "2023-12-15",
      image: PlaceHolderImages.find(p => p.id === 'campaign-1')
    },
    {
      id: "water-project-video",
      type: "video",
      category: "infrastructure",
      title: "Clean Water Project Impact",
      location: "Gaza Strip",
      date: "2023-12-10",
      image: PlaceHolderImages.find(p => p.id === 'campaign-2')
    },
    {
      id: "education-success-video",
      type: "video",
      category: "education",
      title: "Education Program Success Stories",
      location: "Multiple Locations",
      date: "2023-12-05",
      image: PlaceHolderImages.find(p => p.id === 'campaign-3')
    },
    {
      id: "volunteer-day-1",
      type: "photo",
      category: "events",
      title: "International Volunteer Day",
      location: "Global Event",
      date: "2023-12-05",
      image: PlaceHolderImages.find(p => p.id === 'volunteer-hero')
    }
  ];

  const categories = [
    { key: "all", icon: ImageIcon },
    { key: "field-work", icon: ImageIcon },
    { key: "infrastructure", icon: ImageIcon },
    { key: "education", icon: ImageIcon },
    { key: "events", icon: ImageIcon }
  ];

  const filteredItems = filter === "all" 
    ? mediaItems 
    : mediaItems.filter(item => item.category === filter);

  const photoCount = mediaItems.filter(item => item.type === "photo").length;
  const videoCount = mediaItems.filter(item => item.type === "video").length;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent leading-tight">
            {t('gallery.title')}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fadeInUp animation-delay-100">
            {t('gallery.subtitle')}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 pt-4 animate-fadeInUp animation-delay-200">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <span className="font-bold">{photoCount}</span>
              <span className="text-muted-foreground">{t('gallery.photos')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-accent" />
              <span className="font-bold">{videoCount}</span>
              <span className="text-muted-foreground">{t('gallery.videos')}</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fadeInUp animation-delay-300">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={filter === category.key ? "default" : "outline"}
              className={`px-6 py-6 rounded-2xl shadow-modern hover:shadow-modern-md transition-all ${
                filter === category.key ? "scale-105" : ""
              }`}
              onClick={() => setFilter(category.key)}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {t(`gallery.categories.${category.key}`)}
            </Button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp animation-delay-400">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className="group overflow-hidden shadow-modern-lg border-border/50 hover:shadow-modern-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${(index + 5) * 50}ms` }}
            >
              <div className="relative h-72 overflow-hidden">
                {item.image && (
                  <Image
                    src={item.image.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={item.image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Type Badge */}
                <Badge className={`absolute top-4 right-4 ${
                  item.type === "video" 
                    ? "bg-accent/95 text-accent-foreground" 
                    : "bg-primary/95 text-primary-foreground"
                }`}>
                  {item.type === "video" ? (
                    <><Video className="h-3 w-3 mr-1" /> Video</>
                  ) : (
                    <><ImageIcon className="h-3 w-3 mr-1" /> Photo</>
                  )}
                </Badge>

                {/* Play Button for Videos */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-modern-xl">
                      <Play className="h-8 w-8 text-primary-foreground" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background shadow-modern"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-headline font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{item.location}</p>
                  <p>{formatDate(item.date)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Press Kit CTA */}
        <section className="mt-20 animate-fadeInUp animation-delay-700">
          <Card className="shadow-modern-2xl border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-headline font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                {t('gallery.pressKit.title')}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                {t('gallery.pressKit.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="shadow-modern-md hover:shadow-modern-lg">
                  <Download className="h-5 w-5 mr-2" />
                  {t('gallery.pressKit.downloadPhotos')}
                </Button>
                <Button variant="outline" size="lg" className="shadow-modern hover:shadow-modern-md">
                  <Download className="h-5 w-5 mr-2" />
                  {t('gallery.pressKit.downloadLogos')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

