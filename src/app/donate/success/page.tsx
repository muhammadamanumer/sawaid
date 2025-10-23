"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, Download, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function DonationSuccessPage() {
  const { t, language } = useTranslation();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSession(data.session);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden flex items-center justify-center">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>

      <div className="relative container mx-auto max-w-2xl px-4 md:px-6">
        {loading ? (
          <Card className="shadow-modern-2xl border-border/50 text-center">
            <CardContent className="pt-16 pb-16">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                {language === 'ar' ? 'جاري التحقق من التبرع...' : 'Verifying donation...'}
              </p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="shadow-modern-2xl border-border/50">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-destructive/10 rounded-full w-fit mb-4">
                <CheckCircle2 className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-3xl">
                {language === 'ar' ? 'خطأ' : 'Error'}
              </CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center gap-4">
              <Button asChild variant="default">
                <Link href="/donate">
                  {language === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="shadow-modern-2xl border-border/50 animate-fadeInUp">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4 animate-bounce">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-4xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                {language === 'ar' ? 'شكراً لتبرعك!' : 'Thank You for Your Donation!'}
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                {language === 'ar' 
                  ? 'تم استلام تبرعك بنجاح. ستصلك رسالة تأكيد عبر البريد الإلكتروني قريباً.'
                  : 'Your donation has been received successfully. You will receive a confirmation email shortly.'}
              </CardDescription>
            </CardHeader>
            
            {session && (
              <CardContent className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-2xl space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'تفاصيل التبرع' : 'Donation Details'}
                  </h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'المبلغ:' : 'Amount:'}
                      </span>
                      <span className="font-bold">
                        {session.currency?.toUpperCase()} ${(session.amount_total / 100).toFixed(2)}
                      </span>
                    </div>
                    {session.customer_email && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}
                        </span>
                        <span className="font-semibold">{session.customer_email}</span>
                      </div>
                    )}
                    {session.metadata?.campaignId && session.metadata.campaignId !== 'general' && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'ar' ? 'الحملة:' : 'Campaign:'}
                        </span>
                        <span className="font-semibold">{session.metadata.campaignId}</span>
                      </div>
                    )}
                    {session.metadata?.zakatEligible === 'true' && (
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="font-semibold">
                          {language === 'ar' ? 'تبرع مؤهل للزكاة' : 'Zakat-Eligible Donation'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-center">
                  <p className="text-sm">
                    {language === 'ar'
                      ? 'تبرعك سيساعد في إحداث فرق إيجابي في حياة المحتاجين'
                      : 'Your donation will help make a positive difference in the lives of those in need'}
                  </p>
                </div>
              </CardContent>
            )}

            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link href="/">
                  <Heart className="mr-2 h-5 w-5" />
                  {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/campaigns">
                  {language === 'ar' ? 'تصفح الحملات' : 'Browse Campaigns'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
