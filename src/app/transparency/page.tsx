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
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('transparency.title')}</h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            {t('transparency.description')}
          </p>
        </div>
        
        <Card className="mb-8 shadow-md">
            <CardHeader>
                <CardTitle className="font-headline">{t('transparency.reportCardTitle')}</CardTitle>
                <CardDescription>{t('transparency.reportCardDescription')}</CardDescription>
            </CardHeader>
            <CardFooter>
                 <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Download className="mr-2 h-4 w-4" />
                    {t('transparency.reportButton')}
                </Button>
            </CardFooter>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline">{t('transparency.allocationTitle')}</CardTitle>
              <CardDescription>{t('transparency.allocationDescription')}</CardDescription>
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

          <Card className="flex flex-col shadow-md">
            <CardHeader>
              <CardTitle className="font-headline">{t('transparency.percentageTitle')}</CardTitle>
              <CardDescription>{t('transparency.percentageDescription')}</CardDescription>
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
