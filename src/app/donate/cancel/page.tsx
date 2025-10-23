"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Heart } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function DonationCancelPage() {
  const { language } = useTranslation();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden flex items-center justify-center">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto max-w-2xl px-4 md:px-6">
        <Card className="shadow-modern-2xl border-border/50 animate-fadeInUp">
          <CardHeader className="text-center">
            <div className="mx-auto p-4 bg-muted rounded-full w-fit mb-4">
              <XCircle className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline">
              {language === 'ar' ? 'تم إلغاء التبرع' : 'Donation Cancelled'}
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              {language === 'ar'
                ? 'تم إلغاء عملية التبرع. لم يتم خصم أي مبلغ من حسابك.'
                : 'Your donation was cancelled. No charge was made to your account.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-6 bg-muted/50 rounded-2xl text-center space-y-3">
              <h3 className="font-bold">
                {language === 'ar' ? 'ما التالي؟' : 'What\'s Next?'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'إذا كنت تواجه مشكلة في عملية التبرع، يرجى الاتصال بنا. نحن هنا للمساعدة!'
                  : 'If you experienced any issues with the donation process, please contact us. We\'re here to help!'}
              </p>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  {language === 'ar'
                    ? 'نقدر اهتمامك بدعم قضيتنا. كل مساهمة، مهما كانت صغيرة، تحدث فرقاً كبيراً.'
                    : 'We appreciate your interest in supporting our cause. Every contribution, no matter how small, makes a big difference.'}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/donate">
                <ArrowLeft className="mr-2 h-5 w-5" />
                {language === 'ar' ? 'المحاولة مرة أخرى' : 'Try Again'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/contact">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
