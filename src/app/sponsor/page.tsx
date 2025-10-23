"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SponsorPage() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-primary-dark text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'ar' ? 'سجل كراعٍ' : 'Register as a Sponsor'}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              {language === 'ar' 
                ? 'انضم إلى مجتمع الرعاة وكن جزءًا من التغيير المستدام'
                : 'Join our community of sponsors and be part of sustainable change'}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'ar' ? 'لماذا تصبح راعيًا؟' : 'Why Become a Sponsor?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {language === 'ar' ? 'تأثير مباشر' : 'Direct Impact'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === 'ar'
                      ? 'تتبع تأثير دعمك مباشرة على المستفيدين'
                      : 'Track your support\'s direct impact on beneficiaries'}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {language === 'ar' ? 'مجتمع الرعاة' : 'Sponsor Community'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === 'ar'
                      ? 'انضم إلى شبكة عالمية من الرعاة الملتزمين'
                      : 'Join a global network of committed sponsors'}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {language === 'ar' ? 'تقارير شهرية' : 'Monthly Reports'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === 'ar'
                      ? 'احصل على تحديثات شهرية حول التقدم المحرز'
                      : 'Receive monthly updates on progress achieved'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-modern-xl">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === 'ar' ? 'نموذج التسجيل' : 'Registration Form'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar'
                    ? 'املأ النموذج أدناه لبدء رحلتك كراعٍ'
                    : 'Fill out the form below to start your sponsorship journey'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                      </Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {language === 'ar' ? 'اسم العائلة' : 'Last Name'}
                      </Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sponsorshipType">
                      {language === 'ar' ? 'نوع الرعاية' : 'Sponsorship Type'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر نوع الرعاية' : 'Select sponsorship type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">
                          {language === 'ar' ? 'رعاية فردية' : 'Individual Sponsorship'}
                        </SelectItem>
                        <SelectItem value="family">
                          {language === 'ar' ? 'رعاية عائلة' : 'Family Sponsorship'}
                        </SelectItem>
                        <SelectItem value="education">
                          {language === 'ar' ? 'رعاية تعليمية' : 'Education Sponsorship'}
                        </SelectItem>
                        <SelectItem value="general">
                          {language === 'ar' ? 'رعاية عامة' : 'General Sponsorship'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      {language === 'ar' ? 'المبلغ الشهري (دولار أمريكي)' : 'Monthly Amount (USD)'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر المبلغ' : 'Select amount'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">$50 / {language === 'ar' ? 'شهريًا' : 'month'}</SelectItem>
                        <SelectItem value="100">$100 / {language === 'ar' ? 'شهريًا' : 'month'}</SelectItem>
                        <SelectItem value="200">$200 / {language === 'ar' ? 'شهريًا' : 'month'}</SelectItem>
                        <SelectItem value="custom">{language === 'ar' ? 'مبلغ مخصص' : 'Custom Amount'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === 'ar' ? 'رسالة (اختياري)' : 'Message (Optional)'}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={language === 'ar' 
                        ? 'أخبرنا لماذا تريد أن تصبح راعيًا...'
                        : 'Tell us why you want to become a sponsor...'}
                      rows={4}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" className="mt-1" required />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      {language === 'ar'
                        ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
                        : 'I agree to the terms and conditions and privacy policy'}
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    {language === 'ar' ? 'إرسال التسجيل' : 'Submit Registration'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              {language === 'ar' ? 'هل لديك أسئلة؟' : 'Have questions?'}{' '}
              <Link href="/contact" className="text-primary hover:underline">
                {language === 'ar' ? 'اتصل بنا' : 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
