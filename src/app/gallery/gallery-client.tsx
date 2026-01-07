"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video, Download, Play } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { MediaAssetDocument } from "@/types/appwrite";

interface GalleryClientProps {
  mediaAssets: MediaAssetDocument[];
}

export function GalleryClient({ mediaAssets }: GalleryClientProps) {
  const { language } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "video">("all");

  // Get unique tags for filter options
  const allTags = Array.from(
    new Set(mediaAssets.flatMap((m) => m.tags || []))
  ).slice(0, 5); // Limit to 5 categories

  const filteredItems = mediaAssets.filter((item) => {
    const matchesTag = filter === "all" || (item.tags && item.tags.includes(filter));
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesTag && matchesType;
  });

  const photoCount = mediaAssets.filter((item) => item.type === "image").length;
  const videoCount = mediaAssets.filter((item) => item.type === "video").length;

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-QA' : 'en-QA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

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
            {language === 'ar' ? 'معرض الوسائط' : 'Media Gallery'}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fadeInUp animation-delay-100">
            {language === 'ar' 
              ? 'استعرض صور ومقاطع فيديو من عملنا في الميدان'
              : 'Browse photos and videos from our work in the field'}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 pt-4 animate-fadeInUp animation-delay-200">
            <button 
              onClick={() => setTypeFilter(typeFilter === "image" ? "all" : "image")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                typeFilter === "image" ? "bg-primary/10" : ""
              }`}
            >
              <ImageIcon className="h-5 w-5 text-primary" />
              <span className="font-bold">{photoCount}</span>
              <span className="text-muted-foreground">
                {language === 'ar' ? 'صورة' : 'Photos'}
              </span>
            </button>
            <button 
              onClick={() => setTypeFilter(typeFilter === "video" ? "all" : "video")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                typeFilter === "video" ? "bg-accent/10" : ""
              }`}
            >
              <Video className="h-5 w-5 text-accent" />
              <span className="font-bold">{videoCount}</span>
              <span className="text-muted-foreground">
                {language === 'ar' ? 'فيديو' : 'Videos'}
              </span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fadeInUp animation-delay-300">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              className="px-6 py-6 rounded-2xl shadow-modern hover:shadow-modern-md transition-all"
              onClick={() => setFilter("all")}
            >
              {language === 'ar' ? 'الكل' : 'All'}
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={filter === tag ? "default" : "outline"}
                className={`px-6 py-6 rounded-2xl shadow-modern hover:shadow-modern-md transition-all ${
                  filter === tag ? "scale-105" : ""
                }`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        )}

        {/* Media Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp animation-delay-400">
            {filteredItems.map((item, index) => {
              const title = language === 'ar' ? item.titleAr : item.titleEn;
              
              return (
                <Card
                  key={item.$id}
                  className="group overflow-hidden shadow-modern-lg border-border/50 hover:shadow-modern-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${(index + 5) * 50}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={item.thumbnailUrl || item.url}
                      alt={title || item.altText || 'Media'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Type Badge */}
                    <Badge
                      className={`absolute top-4 right-4 ${
                        item.type === "video"
                          ? "bg-accent/95 text-accent-foreground"
                          : "bg-primary/95 text-primary-foreground"
                      }`}
                    >
                      {item.type === "video" ? (
                        <>
                          <Video className="h-3 w-3 mr-1" /> 
                          {language === 'ar' ? 'فيديو' : 'Video'}
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-3 w-3 mr-1" /> 
                          {language === 'ar' ? 'صورة' : 'Photo'}
                        </>
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
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      download
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background shadow-modern"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>

                  <CardContent className="p-6">
                    {title && (
                      <h3 className="font-headline font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                    )}
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p>{formatDate(item.$createdAt)}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {language === 'ar' ? 'لا توجد وسائط متاحة' : 'No media available'}
            </p>
          </div>
        )}

        {/* Press Kit CTA */}
        <section className="mt-20 animate-fadeInUp animation-delay-700">
          <Card className="shadow-modern-2xl border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-headline font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                {language === 'ar' ? 'الحقيبة الصحفية' : 'Press Kit'}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                {language === 'ar' 
                  ? 'تحتاج إلى مواد للنشر؟ قم بتحميل صور عالية الجودة وشعاراتنا'
                  : 'Need materials for publication? Download high-resolution photos and our logos'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="shadow-modern-md hover:shadow-modern-lg">
                  <Download className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'تحميل الصور' : 'Download Photos'}
                </Button>
                <Button variant="outline" size="lg" className="shadow-modern hover:shadow-modern-md">
                  <Download className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'تحميل الشعارات' : 'Download Logos'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
