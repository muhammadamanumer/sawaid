"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

type LanguageKey = "en" | "ar" | "ur";

type MethodField = {
  label: string;
  value?: string;
  ltr?: boolean;
};

type MethodNote = {
  text: string;
  value?: string;
};

type Method = {
  title: string;
  fields?: MethodField[];
  note?: MethodNote;
  fullWidth?: boolean;
};

type Region = {
  title: string;
  methods: Method[];
};

type DonationContent = {
  title: string;
  subtitle: string;
  notProvided: string;
  regions: Region[];
};

const donationContent: Record<LanguageKey, DonationContent> = {
  en: {
    title: "Ways to Donate",
    subtitle: "Bank transfer and in-person options",
    notProvided: "Not provided",
    regions: [
      {
        title: "For donations from Turkey",
        methods: [
          {
            title: "Through Al Baraka Bank to the organisation's account",
            fields: [
              { label: "Branch", value: "Homs" },
              { label: "Swift Code", value: "BBSYSYDA", ltr: true },
              { label: "Account name", value: "Sawaid Al-Islah Foundation" },
              { label: "Account number", value: "301-760-210101-7005308-0", ltr: true },
            ],
            note: {
              text: "Important note: Please send a copy of the transfer receipt after sending the donation amount to the following number:",
              value: "00905387078528",
            },
          },
        ],
      },
      {
        title: "For donations inside Syria",
        methods: [
          {
            title: "Via Syriatel Cash",
            fields: [{ label: "Number", value: "", ltr: true }],
            note: {
              text: "Important note: A photo of the paper donation receipt must be sent to the number to which the donation was made.",
            },
          },
          {
            title: "Via Bank Sham",
            fields: [
              { label: "Account name", value: "" },
              { label: "Account number", value: "", ltr: true },
            ],
          },
          {
            title: "Through our bank account at Al Baraka Bank",
            fields: [
              { label: "Branch", value: "Homs" },
              { label: "Swift Code", value: "BBSYSYDA", ltr: true },
              { label: "Account name", value: "Sawaid Al-Islah Foundation" },
              { label: "Account number", value: "301-760-210101-7005308-0", ltr: true },
            ],
            note: {
              text: "Important note: Please send a copy of the transfer receipt after sending the donation amount to the following number:",
              value: "",
            },
            fullWidth: true,
          },
          {
            title: "Donations can also be received in person at the organisation's office",
            fields: [
              {
                label: "Address",
                value: "City of Homs - Karam Al-Shami neighbourhood - Al-Muneer Mosque",
              },
            ],
            fullWidth: true,
          },
        ],
      },
    ],
  },
  ar: {
    title: "طرق التبرع",
    subtitle: "تفاصيل التحويل البنكي والاستلام المباشر",
    notProvided: "غير متوفر حالياً",
    regions: [
      {
        title: "للتبرع من تركيا",
        methods: [
          {
            title: "من خلال بنك البركة على حساب المؤسسة",
            fields: [
              { label: "شعبة البنك", value: "حمص / HOMS" },
              { label: "Swift Code", value: "BBSYSYDA", ltr: true },
              { label: "اسم الحساب", value: "مؤسسة سواعد الإصلاح / Sawaid Al-Islah Foundation" },
              { label: "رقم الحساب", value: "301-760-210101-7005308-0", ltr: true },
            ],
            note: {
              text: "ملاحظة مهمة: يرجى إرسال صورة عن وصل التسليم بعد إرسال مبلغ التبرع إلى الرقم:",
              value: "00905387078528",
            },
          },
        ],
      },
      {
        title: "للتبرع من داخل سوريا",
        methods: [
          {
            title: "عن طريق Syriatel كاش",
            fields: [{ label: "الرقم", value: "", ltr: true }],
            note: {
              text: "ملاحظة مهمة: سيتم إرسال صورة من إيصال التبرع الورقي على الرقم الذي تم إرسال التبرع من خلاله.",
            },
          },
          {
            title: "عن طريق بنك شام",
            fields: [
              { label: "اسم الحساب", value: "" },
              { label: "رقم الحساب", value: "", ltr: true },
            ],
          },
          {
            title: "عبر حسابنا البنكي في بنك البركة",
            fields: [
              { label: "شعبة البنك", value: "حمص / HOMS" },
              { label: "Swift Code", value: "BBSYSYDA", ltr: true },
              { label: "اسم الحساب", value: "مؤسسة سواعد الإصلاح / Sawaid Al-Islah Foundation" },
              { label: "رقم الحساب", value: "301-760-210101-7005308-0", ltr: true },
            ],
            note: {
              text: "ملاحظة مهمة: يرجى إرسال صورة عن وصل التسليم بعد إرسال مبلغ التبرع إلى الرقم:",
              value: "",
            },
            fullWidth: true,
          },
          {
            title: "يمكن استلام التبرعات من خلال مقر المؤسسة",
            fields: [
              {
                label: "العنوان",
                value: "مدينة حمص، حي كرم الشامي، مسجد المنير",
              },
            ],
            fullWidth: true,
          },
        ],
      },
    ],
  },
  ur: {
    title: "عطیات کے طریقے",
    subtitle: "بینک ٹرانسفر اور بالمشافہ وصولی کے طریقے",
    notProvided: "فی الحال دستیاب نہیں",
    regions: [
      {
        title: "ترکیہ سے عطیات",
        methods: [
          {
            title: "بینک البرکہ کے ذریعے ادارے کے اکاؤنٹ میں",
            fields: [
              { label: "برانچ", value: "حمص / HOMS" },
              { label: "سویفٹ کوڈ", value: "BBSYSYDA", ltr: true },
              { label: "اکاؤنٹ کا نام", value: "سوائد الاصلاح فاؤنڈیشن / Sawaid Al-Islah Foundation" },
              { label: "اکاؤنٹ نمبر", value: "301-760-210101-7005308-0", ltr: true },
            ],
            note: {
              text: "اہم نوٹ: رقم بھیجنے کے بعد رسید کی تصویر درج ذیل نمبر پر ارسال کریں:",
              value: "00905387078528",
            },
          },
        ],
      },
      {
        title: "شام کے اندر سے عطیات",
        methods: [
          {
            title: "سریاتیل کیش کے ذریعے",
            fields: [{ label: "نمبر", value: "", ltr: true }],
            note: {
              text: "اہم نوٹ: کاغذی رسید کی تصویر اسی نمبر پر ارسال کی جائے جس کے ذریعے عطیہ کیا گیا ہے۔",
            },
          },
          {
            title: "بینک شام کے ذریعے",
            fields: [
              { label: "اکاؤنٹ کا نام", value: "" },
              { label: "اکاؤنٹ نمبر", value: "", ltr: true },
            ],
          },
          {
            title: "ہمارے بینک البرکہ اکاؤنٹ کے ذریعے",
            fields: [
              { label: "برانچ", value: "حمص / HOMS" },
              { label: "سویفٹ کوڈ", value: "BBSYSYDA", ltr: true },
              { label: "اکاؤنٹ کا نام", value: "سوائد الاصلاح فاؤنڈیشن / Sawaid Al-Islah Foundation" },
              { label: "اکاؤنٹ نمبر", value: "301-760-210101-7005308-0", ltr: true },
            ],
            note: {
              text: "اہم نوٹ: رقم بھیجنے کے بعد رسید کی تصویر درج ذیل نمبر پر ارسال کریں:",
              value: "",
            },
            fullWidth: true,
          },
          {
            title: "ادارے کے دفتر میں حضوری طور پر بھی عطیات وصول کیے جا سکتے ہیں",
            fields: [
              {
                label: "پتہ",
                value: "شہر حمص - کرم الشامی محلہ - مسجد المنیر",
              },
            ],
            fullWidth: true,
          },
        ],
      },
    ],
  },
};

function LtrValue({ value }: { value: string }) {
  return (
    <span dir="ltr" className="font-mono tracking-wide text-foreground">
      {value}
    </span>
  );
}

function FieldValue({
  value,
  ltr,
  notProvided,
}: {
  value?: string;
  ltr?: boolean;
  notProvided: string;
}) {
  const hasValue = Boolean(value && value.trim());
  if (!hasValue) {
    return <span className="text-muted-foreground">{notProvided}</span>;
  }
  if (ltr) {
    return <LtrValue value={value as string} />;
  }
  return <span className="text-foreground">{value}</span>;
}

function DonationMethodsContent({ lang }: { lang: LanguageKey }) {
  const content = donationContent[lang];
  const isRtl = lang !== "en";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
      className={cn("space-y-10", isRtl ? "text-right" : "text-left")}
    >
      {content.regions.map((region, regionIndex) => (
        <div key={`${lang}-${regionIndex}`} className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {region.title}
            </span>
            <span className="h-px flex-1 bg-border/70" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {region.methods.map((method, methodIndex) => (
              <div
                key={`${lang}-${regionIndex}-${methodIndex}`}
                className={cn(
                  "rounded-2xl border border-border/60 bg-background/70 p-5 shadow-modern",
                  method.fullWidth ? "md:col-span-2" : ""
                )}
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {methodIndex + 1}
                  </span>
                  <h4 className="text-base font-semibold text-foreground">{method.title}</h4>
                </div>
                {method.fields && method.fields.length > 0 && (
                  <dl className="space-y-2 text-sm">
                    {method.fields.map((field, fieldIndex) => (
                      <div
                        key={`${lang}-${regionIndex}-${methodIndex}-${fieldIndex}`}
                        className={cn(
                          "flex items-start justify-between gap-4",
                          isRtl ? "flex-row-reverse" : ""
                        )}
                      >
                        <dt className="text-muted-foreground">{field.label}</dt>
                        <dd className={cn("font-medium", isRtl ? "text-left" : "text-right")}>
                          <FieldValue
                            value={field.value}
                            ltr={field.ltr}
                            notProvided={content.notProvided}
                          />
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                {method.note && (
                  <div className="mt-4 rounded-xl border border-border/50 bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{method.note.text}</span>
                    {method.note.value ? (
                      <span className={cn(isRtl ? "mr-2" : "ml-2")}>
                        <LtrValue value={method.note.value} />
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DonationMethods() {
  const { language } = useTranslation();
  const defaultTab: LanguageKey = language === "ar" ? "ar" : "en";
  const [activeLang, setActiveLang] = useState<LanguageKey>(defaultTab);
  const activeContent = donationContent[activeLang];

  return (
    <section className="mt-14">
      <Tabs value={activeLang} onValueChange={(value) => setActiveLang(value as LanguageKey)}>
        <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-modern-xl backdrop-blur-md md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold text-foreground">
                {activeContent.title}
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                {activeContent.subtitle}
              </p>
            </div>
            <TabsList className="h-11 rounded-full bg-muted/70 p-1 shadow-modern">
              <TabsTrigger value="en" className="rounded-full px-4">
                English
              </TabsTrigger>
              <TabsTrigger value="ar" className="rounded-full px-4">
                العربية
              </TabsTrigger>
              <TabsTrigger value="ur" className="rounded-full px-4">
                اردو
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="en" className="mt-8">
            <DonationMethodsContent lang="en" />
          </TabsContent>
          <TabsContent value="ar" className="mt-8">
            <DonationMethodsContent lang="ar" />
          </TabsContent>
          <TabsContent value="ur" className="mt-8">
            <DonationMethodsContent lang="ur" />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
