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
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{t('donate.form.title')}</CardTitle>
        <CardDescription>{t('donate.form.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">{t('donate.form.frequencyTitle')}</Label>
          <RadioGroup
            defaultValue="one-time"
            onValueChange={setFrequency}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="one-time" id="one-time" className="peer sr-only" />
              <Label
                htmlFor="one-time"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {t('donate.form.oneTime')}
              </Label>
            </div>
            <div>
              <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
              <Label
                htmlFor="monthly"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" /> {t('donate.form.monthly')}
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">{t('donate.form.amountTitle')}</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {predefinedAmounts.map((predefined) => (
              <Button
                key={predefined}
                variant={amount === predefined && customAmount === "" ? "default" : "outline"}
                className={cn("p-6 text-lg", amount === predefined && customAmount === "" ? "bg-primary text-primary-foreground" : "")}
                onClick={() => handleAmountClick(predefined)}
              >
                ${predefined}
              </Button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="number"
              placeholder={t('donate.form.customAmount')}
              className="pl-7 text-lg h-auto p-3"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={() => setAmount(0)}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
           <h3 className="text-lg font-semibold">{t('donate.form.paymentTitle')}</h3>
           <p className="text-sm text-muted-foreground">{t('donate.form.paymentDescription')}</p>
           <div className="grid gap-4">
              <div className="space-y-2">
                  <Label htmlFor="name">{t('donate.form.nameLabel')}</Label>
                  <Input id="name" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">{t('donate.form.emailLabel')}</Label>
                  <Input id="email" type="email" placeholder="jane.doe@example.com" />
              </div>
               <div className="space-y-2">
                  <Label>{t('donate.form.cardLabel')}</Label>
                  <div className="border rounded-md p-3 bg-muted/50 text-center text-muted-foreground h-12 flex items-center justify-center">
                      {t('donate.form.cardPlaceholder')}
                  </div>
              </div>
           </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl">
          {t('donate.form.donateButton')} ${finalAmount > 0 ? finalAmount.toLocaleString() : ''} {frequency === "monthly" && finalAmount > 0 ? t('donate.form.perMonth') : ""}
        </Button>
      </CardFooter>
    </Card>
  );
}
