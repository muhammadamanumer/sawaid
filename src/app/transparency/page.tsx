"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { financialData } from "@/lib/data"
import { useTranslation } from "@/hooks/use-translation";

const chartConfig = {
  amount: {
    label: "Amount (USD)",
  },
  "Food & Water Programs": {
    label: "Food & Water",
    color: "hsl(var(--chart-1))",
  },
  "Medical Aid": {
    label: "Medical Aid",
    color: "hsl(var(--chart-2))",
  },
  "Education & Child Support": {
    label: "Education",
    color: "hsl(var(--chart-3))",
  },
  "Infrastructure & Shelter": {
    label: "Infrastructure",
    color: "hsl(var(--chart-4))",
  },
  "Administration & Fundraising": {
    label: "Admin & Fundraising",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function TransparencyPage() {
  const { t } = useTranslation();
  const totalAmount = financialData.reduce((acc, item) => acc + item.amount, 0);

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
        
        <Card className="mb-12 shadow-modern-2xl border-border/50 animate-fadeInUp animation-delay-200">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                  {t('transparency.reportCardTitle')}
                </CardTitle>
                <CardDescription className="text-base">{t('transparency.reportCardDescription')}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-6">
                 <Button variant="accent" className="h-14 px-8 text-lg shadow-modern-xl hover:shadow-modern-2xl">
                    <Download className="mr-2 h-5 w-5" />
                    {t('transparency.reportButton')}
                </Button>
            </CardFooter>
        </Card>

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
                      tickFormatter={(value) => t(`financialCategories.${value}`)}
                      className="text-xs"
                      width={120}
                    />
                    <XAxis dataKey="amount" type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" radius={5} layout="vertical">
                      {financialData.map((entry) => (
                        <Cell key={`cell-${entry.category}`} fill={chartConfig[entry.category as keyof typeof chartConfig]?.color} />
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
                    content={<ChartTooltipContent hideLabel nameKey="category" formatter={(value, name) => [`${value}%`, t(`financialCategories.${name}`)]} />}
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
                        fill={chartConfig[entry.category as keyof typeof chartConfig]?.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
             <CardFooter className="flex-col gap-2 text-sm pt-4">
              <div className="flex items-center justify-center gap-2 font-medium leading-none">
                {t('transparency.totalFunds')}: ${totalAmount.toLocaleString()}
              </div>
              <div className="leading-none text-muted-foreground text-center">
                {t('transparency.totalFundsDescription')}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
