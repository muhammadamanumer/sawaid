"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Heart, CreditCard, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { getStripe } from "@/lib/stripe";
import { DonationFormData } from "@/lib/stripe-types";

// Campaign type for the donate form
export interface DonateFormCampaign {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  zakatSupported: boolean;
}

interface DonateFormProps {
  campaigns: DonateFormCampaign[];
  preselectedCampaignSlug?: string;
}

const predefinedAmounts = [100, 200, 500, 1000];

export function DonateForm({ campaigns, preselectedCampaignSlug }: DonateFormProps) {
  const { t, language } = useTranslation();
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState(200);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState<"qar" | "usd" | "eur" | "gbp">("qar");
  
  // Initialize campaign ID from preselected slug
  const getInitialCampaignId = () => {
    if (preselectedCampaignSlug) {
      const campaign = campaigns.find(c => c.slug === preselectedCampaignSlug);
      return campaign?.id || "general";
    }
    return "general";
  };
  
  const [campaignId, setCampaignId] = useState<string>(getInitialCampaignId);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Find selected campaign to check if Zakat eligible
  const selectedCampaign = campaigns.find(c => c.id === campaignId);
  const zakatEligible = selectedCampaign?.zakatSupported || false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (finalAmount <= 0) {
      setError(language === 'ar' ? 'الرجاء إدخال مبلغ صحيح' : 'Please enter a valid amount');
      return;
    }

    if (!firstName || !lastName || !email) {
      setError(language === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      const donationData: DonationFormData = {
        amount: finalAmount,
        currency,
        donationType: frequency,
        firstName,
        lastName,
        email,
        phone,
        campaignId: campaignId === 'general' ? '' : campaignId,
        zakatEligible,
        anonymous,
        message,
      };

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Donation error:', err);
      setError(err.message || (language === 'ar' ? 'حدث خطأ أثناء معالجة التبرع' : 'An error occurred while processing your donation'));
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full shadow-modern-2xl border-border/50">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">{t('donate.form.title')}</CardTitle>
        <CardDescription className="text-base">{t('donate.form.description')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-10">
        <div className="space-y-5">
          <Label className="text-lg font-bold flex items-center gap-2">
            {t('donate.form.frequencyTitle')}
            <span className="h-0.5 w-12 bg-accent rounded-full"></span>
          </Label>
          <RadioGroup
            defaultValue="one-time"
            onValueChange={(value) => setFrequency(value as "one-time" | "monthly")}
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
        
        {/* Currency Selection */}
        <div className="space-y-3">
          <Label htmlFor="currency" className="text-lg font-bold">{language === 'ar' ? 'العملة' : 'Currency'}</Label>
          <Select value={currency} onValueChange={(value: any) => setCurrency(value)}>
            <SelectTrigger className="h-14 rounded-xl border-2 shadow-modern">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qar">QAR (﷼) - Qatari Riyal</SelectItem>
              <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
              <SelectItem value="eur">EUR (€) - Euro</SelectItem>
              <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campaign Selection */}
        <div className="space-y-3">
          <Label htmlFor="campaign" className="text-lg font-bold">{language === 'ar' ? 'اختر حملة (اختياري)' : 'Choose Campaign (Optional)'}</Label>
          <Select value={campaignId} onValueChange={setCampaignId}>
            <SelectTrigger className="h-14 rounded-xl border-2 shadow-modern">
              <SelectValue placeholder={language === 'ar' ? 'تبرع عام' : 'General Donation'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">{ language === 'ar' ? 'تبرع عام' : 'General Donation'}</SelectItem>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {language === 'ar' ? campaign.nameAr : campaign.name}
                  {campaign.zakatSupported && ` ✓ ${language === 'ar' ? 'زكاة' : 'Zakat'}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {zakatEligible && (
            <p className="text-sm text-primary font-semibold">
              ✓ {language === 'ar' ? 'هذه الحملة مؤهلة للزكاة' : 'This campaign is Zakat-eligible'}
            </p>
          )}
        </div>

        <Separator className="my-8" />

        {/* Personal Information */}
        <div className="space-y-5">
           <h3 className="text-lg font-bold flex items-center gap-2">
             {t('donate.form.paymentTitle')}
             <span className="h-0.5 w-12 bg-accent rounded-full"></span>
           </h3>
           <p className="text-sm text-muted-foreground leading-relaxed">{t('donate.form.paymentDescription')}</p>
           <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                  <Label htmlFor="firstName" className="font-semibold">{language === 'ar' ? 'الاسم الأول' : 'First Name'} *</Label>
                  <Input 
                    id="firstName" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={language === 'ar' ? 'محمد' : 'John'} 
                    className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" 
                  />
              </div>
              <div className="space-y-2.5">
                  <Label htmlFor="lastName" className="font-semibold">{language === 'ar' ? 'اسم العائلة' : 'Last Name'} *</Label>
                  <Input 
                    id="lastName" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={language === 'ar' ? 'أحمد' : 'Doe'} 
                    className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" 
                  />
              </div>
           </div>
           <div className="space-y-2.5">
              <Label htmlFor="email" className="font-semibold">{t('donate.form.emailLabel')} *</Label>
              <Input 
                id="email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com" 
                className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" 
              />
           </div>
           <div className="space-y-2.5">
              <Label htmlFor="phone" className="font-semibold">{language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}</Label>
              <Input 
                id="phone" 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (234) 567-890" 
                className="h-12 rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md" 
              />
           </div>
           <div className="space-y-2.5">
              <Label htmlFor="message" className="font-semibold">{language === 'ar' ? 'رسالة (اختياري)' : 'Message (Optional)'}</Label>
              <Textarea 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={language === 'ar' ? 'أضف رسالة...' : 'Add a message...'}
                rows={3}
                className="rounded-xl border-2 shadow-modern transition-all focus:shadow-modern-md resize-none" 
              />
           </div>
           <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymous" 
                checked={anonymous}
                onCheckedChange={(checked) => setAnonymous(checked as boolean)}
              />
              <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                {language === 'ar' ? 'أريد التبرع بشكل مجهول' : 'I want to donate anonymously'}
              </Label>
           </div>
           <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
             <p className="text-sm text-center">
               {language === 'ar' 
                 ? 'ستتم إعادة توجيهك إلى صفحة الدفع الآمنة لـ Stripe لإكمال تبرعك'
                 : 'You will be redirected to Stripe\'s secure payment page to complete your donation'}
             </p>
           </div>
        </div>

      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-6">
        {error && (
          <div className="w-full p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
            {error}
          </div>
        )}
        <Button 
          type="submit"
          size="lg" 
          variant="accent" 
          disabled={isProcessing || finalAmount <= 0}
          className="w-full h-16 text-xl shadow-modern-xl hover:shadow-modern-2xl hover:scale-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              {t('donate.form.donateButton')} ${finalAmount > 0 ? finalAmount.toLocaleString() : ''} {frequency === "monthly" && finalAmount > 0 ? t('donate.form.perMonth') : ""}
            </>
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          {language === 'ar' ? 'مدعوم بأمان من Stripe' : 'Securely powered by Stripe'}
        </p>
      </CardFooter>
      </form>
    </Card>
  );
}
