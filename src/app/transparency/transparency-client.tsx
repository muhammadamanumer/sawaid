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
import { Download, FileText, ExternalLink, Users, Heart, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { ReportDocument } from "@/types/appwrite";
import type { SiteStats } from "@/services/stats";
import type { FinancialAllocation, TransparencyStats } from "@/services/transparency";

// Dynamic chart colors based on HSL chart variables
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(220, 70%, 50%)", // Additional colors if needed
  "hsl(280, 65%, 60%)",
  "hsl(340, 75%, 55%)",
];

interface TransparencyClientProps {
  reports: ReportDocument[];
  stats: SiteStats;
  financialAllocation: FinancialAllocation[];
  transparencyStats: TransparencyStats;
}

export function TransparencyClient({ reports, stats, financialAllocation, transparencyStats }: TransparencyClientProps) {
  const { t, language } = useTranslation();
  
  // Calculate total from dynamic allocation data
  const totalAmount = financialAllocation.reduce((acc, item) => acc + item.amount, 0);
  
  // Prepare chart data with localized labels
  const chartData = financialAllocation.map((item, index) => ({
    category: language === 'ar' ? item.categoryAr : item.category,
    amount: item.amount,
    percentage: item.percentage,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  // Build dynamic chart config
  const chartConfig: ChartConfig = {
    amount: {
      label: language === 'ar' ? 'المبلغ (ر.ق)' : 'Amount (QAR)',
    },
    ...Object.fromEntries(
      chartData.map((item, index) => [
        item.category,
        {
          label: item.category,
          color: CHART_COLORS[index % CHART_COLORS.length],
        },
      ])
    ),
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fadeInUp animation-delay-150">
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">
                {formatCurrency(stats.totalRaised)}
              </p>
              <p className="text-muted-foreground text-sm">
                {language === 'ar' ? 'إجمالي التبرعات' : 'Total Raised'}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">
                {transparencyStats.totalDonors.toLocaleString()}
              </p>
              <p className="text-muted-foreground text-sm">
                {language === 'ar' ? 'المتبرعون' : 'Total Donors'}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">
                {stats.totalCampaigns}
              </p>
              <p className="text-muted-foreground text-sm">
                {language === 'ar' ? 'الحملات النشطة' : 'Active Campaigns'}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">
                {formatCurrency(transparencyStats.avgDonationAmount)}
              </p>
              <p className="text-muted-foreground text-sm">
                {language === 'ar' ? 'متوسط التبرع' : 'Avg. Donation'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fadeInUp animation-delay-175">
          <Card className="shadow-modern-lg border-border/50">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(transparencyStats.zakatDonations)}
                </p>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'تبرعات الزكاة' : 'Zakat Donations'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(transparencyStats.generalDonations)}
                </p>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'تبرعات عامة' : 'General Donations'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-modern-lg border-border/50">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {transparencyStats.recurringDonors.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'متبرعون شهريون' : 'Recurring Donors'}
                </p>
              </div>
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

        {/* Charts Section */}
        {chartData.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10 animate-fadeInUp animation-delay-300">
            <Card className="shadow-modern-2xl border-border/50">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-headline">{t('transparency.allocationTitle')}</CardTitle>
                <CardDescription className="text-base">{t('transparency.allocationDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height={Math.max(350, chartData.length * 50)}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid horizontal={false} />
                      <YAxis
                        dataKey="category"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                          // Truncate long labels
                          return value.length > 15 ? value.substring(0, 15) + '...' : value;
                        }}
                        className="text-xs"
                        width={120}
                      />
                      <XAxis dataKey="amount" type="number" hide />
                      <ChartTooltip 
                        cursor={false} 
                        content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} 
                      />
                      <Bar dataKey="amount" radius={5} layout="vertical">
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
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
                      data={chartData}
                      dataKey="percentage"
                      nameKey="category"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
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
        ) : (
          <Card className="mb-12 shadow-modern-2xl border-border/50 animate-fadeInUp animation-delay-300">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                {language === 'ar' 
                  ? 'لا توجد بيانات مالية متاحة حالياً. ستظهر البيانات هنا بمجرد تسجيل التبرعات.' 
                  : 'No financial data available yet. Data will appear here once donations are recorded.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown Legend */}
        {chartData.length > 0 && (
          <div className="mt-8 animate-fadeInUp animation-delay-350">
            <h3 className="text-xl font-headline font-bold mb-4">
              {language === 'ar' ? 'تفاصيل التوزيع' : 'Allocation Breakdown'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.category}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatCurrency(item.amount)} ({item.percentage}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
