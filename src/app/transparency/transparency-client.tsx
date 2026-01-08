"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, ExternalLink } from "lucide-react";
import { financialData } from "@/lib/data";
import { useTranslation } from "@/hooks/use-translation";
import type { ReportDocument } from "@/types/appwrite";
import type { SiteStats } from "@/services/stats";

// Define colors for chart entries
const CHART_COLORS = {
  "Food & Water Programs": "hsl(var(--chart-1))",
  "Medical Aid": "hsl(var(--chart-2))",
  "Education & Child Support": "hsl(var(--chart-3))",
  "Infrastructure & Shelter": "hsl(var(--chart-4))",
  "Administration & Fundraising": "hsl(var(--chart-5))",
} as const;

const chartConfig = {
  amount: {
    label: "Amount (QAR)",
  },
  "Food & Water Programs": {
    label: "Food & Water",
    color: CHART_COLORS["Food & Water Programs"],
  },
  "Medical Aid": {
    label: "Medical Aid",
    color: CHART_COLORS["Medical Aid"],
  },
  "Education & Child Support": {
    label: "Education",
    color: CHART_COLORS["Education & Child Support"],
  },
  "Infrastructure & Shelter": {
    label: "Infrastructure",
    color: CHART_COLORS["Infrastructure & Shelter"],
  },
  "Administration & Fundraising": {
    label: "Admin & Fundraising",
    color: CHART_COLORS["Administration & Fundraising"],
  },
} satisfies ChartConfig;

interface TransparencyClientProps {
  reports: ReportDocument[];
  stats: SiteStats;
}

export function TransparencyClient({ reports, stats }: TransparencyClientProps) {
  const { t, language } = useTranslation();
  const totalAmount = financialData.reduce((acc, item) => acc + item.amount, 0);

  // Group reports by type
  const annualReports = reports.filter(r => r.reportType === 'annual');
  const quarterlyReports = reports.filter(r => r.reportType === 'quarterly');
  const projectReports = reports.filter(r => r.reportType === 'project');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-QA' : 'en-QA', {
      style: 'currency',
      currency: 'QAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getReportTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; ar: string }> = {
      annual: { en: 'Annual Report', ar: 'تقرير سنوي' },
      quarterly: { en: 'Quarterly Report', ar: 'تقرير ربع سنوي' },
      project: { en: 'Project Report', ar: 'تقرير مشروع' },
    };
    return labels[type]?.[language] || type;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent leading-tight">
            {t('transparency.title')}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fadeInUp animation-delay-100">
            {t('transparency.description')}
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fadeInUp animation-delay-150">
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <p className="text-4xl font-bold text-primary mb-2">
                {formatCurrency(stats.totalRaised)}
              </p>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'إجمالي التبرعات' : 'Total Donations'}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <p className="text-4xl font-bold text-primary mb-2">
                {stats.totalCampaigns}
              </p>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'الحملات النشطة' : 'Active Campaigns'}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <p className="text-4xl font-bold text-primary mb-2">
                {stats.beneficiariesHelped.toLocaleString()}+
              </p>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'المستفيدين' : 'Beneficiaries'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        {reports.length > 0 && (
          <div className="mb-12 animate-fadeInUp animation-delay-200">
            <h2 className="text-3xl font-headline font-bold mb-6">
              {language === 'ar' ? 'التقارير المالية' : 'Financial Reports'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => {
                const title = language === 'ar' ? report.titleAr : report.titleEn;
                const description = language === 'ar' ? report.descriptionAr : report.descriptionEn;
                
                return (
                  <Card key={report.$id} className="shadow-modern-lg border-border/50 hover:shadow-modern-xl transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline">
                          {report.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-4">{title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {getReportTypeLabel(report.reportType)}
                      </Badge>
                      {report.pdfUrl && (
                        <Button asChild size="sm" variant="ghost">
                          <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'تحميل' : 'Download'}
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Latest Annual Report Card - Show if no reports */}
        {reports.length === 0 && (
          <Card className="mb-12 shadow-modern-2xl border-border/50 animate-fadeInUp animation-delay-200">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                {t('transparency.reportCardTitle')}
              </CardTitle>
              <CardDescription className="text-base">{t('transparency.reportCardDescription')}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-6">
              <Button variant="accent" className="h-14 px-8 text-lg shadow-modern-xl hover:shadow-modern-2xl" disabled>
                <Download className="mr-2 h-5 w-5" />
                {language === 'ar' ? 'قريباً' : 'Coming Soon'}
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-10 animate-fadeInUp animation-delay-300">
          <Card className="shadow-modern-2xl border-border/50">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-headline">{t('transparency.allocationTitle')}</CardTitle>
              <CardDescription className="text-base">{t('transparency.allocationDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={financialData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid horizontal={false} />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => {
                        // Simplify labels for chart
                        const shortLabels: Record<string, string> = {
                          'Food & Water Programs': language === 'ar' ? 'الغذاء والماء' : 'Food & Water',
                          'Medical Aid': language === 'ar' ? 'الإعانة الطبية' : 'Medical Aid',
                          'Education & Child Support': language === 'ar' ? 'التعليم' : 'Education',
                          'Infrastructure & Shelter': language === 'ar' ? 'البنية التحتية' : 'Infrastructure',
                          'Administration & Fundraising': language === 'ar' ? 'الإدارة' : 'Admin',
                        };
                        return shortLabels[value] || value;
                      }}
                      className="text-xs"
                      width={100}
                    />
                    <XAxis dataKey="amount" type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" radius={5} layout="vertical">
                      {financialData.map((entry) => (
                        <Cell key={`cell-${entry.category}`} fill={CHART_COLORS[entry.category as keyof typeof CHART_COLORS]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="flex flex-col shadow-modern-2xl border-border/50">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-headline">{t('transparency.percentageTitle')}</CardTitle>
              <CardDescription className="text-base">{t('transparency.percentageDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center pb-0">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[350px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="category" formatter={(value) => [`${value}%`]} />}
                  />
                  <Pie
                    data={financialData}
                    dataKey="percentage"
                    nameKey="category"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {financialData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[entry.category as keyof typeof CHART_COLORS]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm pt-4">
              <div className="flex items-center justify-center gap-2 font-medium leading-none">
                {t('transparency.totalFunds')}: {formatCurrency(totalAmount)}
              </div>
              <div className="leading-none text-muted-foreground text-center">
                {t('transparency.totalFundsDescription')}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-fadeInUp animation-delay-400">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'هل لديك أسئلة؟' : 'Have Questions?'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'نحن ملتزمون بالشفافية الكاملة. لا تتردد في التواصل معنا لأي استفسارات حول إدارة التبرعات.'
                : 'We are committed to full transparency. Feel free to reach out with any questions about donation management.'}
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
