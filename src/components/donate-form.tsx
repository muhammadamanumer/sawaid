"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const predefinedAmounts = [25, 50, 100, 250];

export function DonateForm() {
  const { t } = useTranslation();
  const [frequency, setFrequency] = useState("one-time");
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    } else if (e.target.value === "") {
        setAmount(0);
    }
  };

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : amount;

  return (
    <Card className="w-full shadow-modern-2xl border-border/50">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">{t('donate.form.title')}</CardTitle>
        <CardDescription className="text-base">{t('donate.form.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-5">
          <Label className="text-lg font-bold flex items-center gap-2">
            {t('donate.form.frequencyTitle')}
            <span className="h-0.5 w-12 bg-accent rounded-full"></span>
          </Label>
          <RadioGroup
            defaultValue="one-time"
            onValueChange={setFrequency}
            className="grid grid-cols-2 gap-5"
          >
            <div className="group">
              <RadioGroupItem value="one-time" id="one-time" className="peer sr-only" />
              <Label
                htmlFor="one-time"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-border/50 bg-background p-6 hover:bg-primary/5 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary transition-all duration-300 shadow-modern hover:shadow-modern-md font-semibold"
              >
                {t('donate.form.oneTime')}
              </Label>
            </div>
            <div className="group">
              <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
              <Label
                htmlFor="monthly"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-border/50 bg-background p-6 hover:bg-primary/5 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary transition-all duration-300 shadow-modern hover:shadow-modern-md"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Heart className="h-5 w-5 text-primary" /> {t('donate.form.monthly')}
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-5">
          <Label className="text-lg font-bold flex items-center gap-2">
            {t('donate.form.amountTitle')}
            <span className="h-0.5 w-12 bg-accent rounded-full"></span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {predefinedAmounts.map((predefined) => (
              <Button
                key={predefined}
                variant={amount === predefined && customAmount === "" ? "default" : "outline"}
                className={cn(
                  "h-16 text-xl font-bold rounded-2xl transition-all duration-300 shadow-modern hover:shadow-modern-md",
                  amount === predefined && customAmount === "" ? "scale-105" : "hover:scale-105"
                )}
                onClick={() => handleAmountClick(predefined)}
              >
                ${predefined}
              </Button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl font-bold">$</span>
            <Input
              type="number"
              placeholder={t('donate.form.customAmount')}
              className="pl-10 text-xl h-16 rounded-2xl border-2 shadow-modern focus:shadow-modern-md transition-all font-semibold"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={() => setAmount(0)}
            />
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="space-y-5">
           <h3 className="text-lg font-bold flex items-center gap-2">
             {t('donate.form.paymentTitle')}
             <span className="h-0.5 w-12 bg-accent rounded-full"></span>
           </h3>
           <p className="text-sm text-muted-foreground leading-relaxed">{t('donate.form.paymentDescription')}</p>
           <div className="grid gap-5">
              <div className="space-y-2.5">
                  <Label htmlFor="name" className="font-semibold">{t('donate.form.nameLabel')}</Label>
                  <Input id="name" placeholder="Jane Doe" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
              </div>
              <div className="space-y-2.5">
                  <Label htmlFor="email" className="font-semibold">{t('donate.form.emailLabel')}</Label>
                  <Input id="email" type="email" placeholder="jane.doe@example.com" className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" />
              </div>
               <div className="space-y-2.5">
                  <Label className="font-semibold">{t('donate.form.cardLabel')}</Label>
                  <div className="border-2 rounded-xl p-4 bg-gradient-to-br from-muted/50 to-muted text-center text-muted-foreground h-14 flex items-center justify-center shadow-inner-modern font-medium">
                      {t('donate.form.cardPlaceholder')}
                  </div>
              </div>
           </div>
        </div>

      </CardContent>
      <CardFooter className="pt-6">
        <Button 
          size="lg" 
          variant="accent" 
          className="w-full h-16 text-xl shadow-modern-xl hover:shadow-modern-2xl hover:scale-102 transition-all"
        >
          {t('donate.form.donateButton')} ${finalAmount > 0 ? finalAmount.toLocaleString() : ''} {frequency === "monthly" && finalAmount > 0 ? t('donate.form.perMonth') : ""}
        </Button>
      </CardFooter>
    </Card>
  );
}
