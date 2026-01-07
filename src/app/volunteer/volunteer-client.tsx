"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { VolunteerPositionDocument } from "@/types/appwrite";
import { CheckCircle, MapPin, Briefcase } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { z } from "zod";
import { submitVolunteerApplication } from "@/services/volunteers";
import { toast } from "@/hooks/use-toast";
import { ensureAnonymousSession } from "@/lib/appwrite";
import { getVolunteerPositions } from "@/services/volunteer-positions";

const volunteerSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().optional(),
    positionOfInterest: z.string().min(1, { message: "Please select a position" }),
    message: z.string().min(0, { message: "Motivation message should be at least 10 characters" }),
});

interface VolunteerClientProps {
    positions: VolunteerPositionDocument[];
}

export function VolunteerClient({ positions }: VolunteerClientProps) {
    const { t, language } = useTranslation();
    const heroImage = PlaceHolderImages.find(p => p.id === 'volunteer-hero');
    const [positionsState, setPositionsState] = useState<VolunteerPositionDocument[]>(positions || []);
    const [positionsLoading, setPositionsLoading] = useState(false);
    const [positionsError, setPositionsError] = useState<string | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        positionOfInterest: "",
        message: "",
    });

    const [formErrors, setFormErrors] = useState<any>({});
    const getError = (name: keyof typeof formData) =>
        formErrors?.[name]?.[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate the form data
        try {
            volunteerSchema.parse(formData);  // This will throw an error if validation fails
            // Simulate form submission
            const response = await submitVolunteerApplication(formData);
            toast({
                title: language === 'ar' ? 'تم الإرسال بنجاح!' : 'Submitted Successfully!',
                description: language === 'ar' ? 'شكراً لتقديمك. سنكون على اتصال قريباً.' : 'Thank you for applying. We will be in touch soon.',
                duration: 5000,
                variant: 'default',
            });
            console.log(response);
            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                positionOfInterest: "",
                message: "",
            });
            setIsSubmitting(false);
        } catch (error: any) {
            console.error("Volunteer Form submission error:", error);
            setFormErrors(error.message); // Extract error messages from Zod validation error
            setIsSubmitting(false);
        }
    };

    // Fetch volunteer positions on the client to avoid auth issues
    // Ensures anonymous session for public reads
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setPositionsLoading(true);
                setPositionsError(null);
                await ensureAnonymousSession();
                const data = await getVolunteerPositions();
                if (mounted) setPositionsState(data);
            } catch (err: any) {
                console.error('Client fetch volunteer positions failed:', err);
                if (mounted) setPositionsError('Failed to load positions');
            } finally {
                if (mounted) setPositionsLoading(false);
            }
        })();
        return () => { mounted = false; };
    // Intentionally ignore positions prop to always refresh client-side
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Get type label based on position type
    const getTypeLabel = (type: string) => {
        const labels: Record<string, { en: string; ar: string }> = {
            remote: { en: 'Remote', ar: 'عن بُعد' },
            onsite: { en: 'On-site', ar: 'في الموقع' },
            hybrid: { en: 'Hybrid', ar: 'هجين' },
        };
        return labels[type]?.[language] || type;
    };

    return (
        <div>
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover -z-10 scale-105"
                        data-ai-hint={heroImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/40" />

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
                </div>

                <div className="relative container mx-auto px-4 md:px-6 text-center text-primary-foreground z-10">
                    <h1 className="text-5xl md:text-7xl font-headline font-bold drop-shadow-2xl animate-fadeInUp leading-tight">
                        {t('volunteer.title')}
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-primary-foreground/95 drop-shadow-lg animate-fadeInUp animation-delay-200 leading-relaxed">
                        {t('volunteer.description')}
                    </p>
                </div>
            </section>

            <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                </div>

                <div className="relative container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-start">
                    <div className="animate-fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                            {t('volunteer.positionsTitle')}
                        </h2>

                        {positionsLoading ? (
                            <div className="text-center py-12 bg-muted/50 rounded-2xl">
                                <p className="text-muted-foreground text-lg">
                                    {language === 'ar' ? 'جارٍ تحميل الوظائف...' : 'Loading positions...'}
                                </p>
                            </div>
                        ) : positionsError ? (
                            <div className="text-center py-12 bg-destructive/10 rounded-2xl">
                                <p className="text-destructive text-lg">
                                    {language === 'ar' ? 'تعذر تحميل الوظائف' : 'Unable to load positions'}
                                </p>
                            </div>
                        ) : positionsState.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {positionsState.map((position, index) => {
                                    const title = language === 'ar' ? position.titleAr : position.titleEn;

                                    return (
                                        <AccordionItem
                                            key={position.$id}
                                            value={`item-${index}`}
                                            className="border-2 border-border/50 rounded-2xl px-6 shadow-modern hover:shadow-modern-lg transition-all bg-background/50 backdrop-blur-sm"
                                        >
                                            <AccordionTrigger className="text-xl font-headline hover:no-underline py-6 hover:text-primary transition-colors">
                                                <span className="flex-1 text-left">{title}</span>
                                                <span className="text-sm font-body text-muted-foreground ml-4 mr-4 flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4" />
                                                    {getTypeLabel(position.type)}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-4 pt-2 pb-6">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{getTypeLabel(position.type)}</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setSelectedPosition(position.$id)}
                                                >
                                                    {language === 'ar' ? 'تقدم لهذا المنصب' : 'Apply for this position'}
                                                </Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        ) : (
                            <div className="text-center py-12 bg-muted/50 rounded-2xl">
                                <p className="text-muted-foreground text-lg">
                                    {language === 'ar' ? 'لا توجد وظائف متاحة حالياً' : 'No positions available at the moment'}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-24 animate-fadeInUp animation-delay-200">
                        <Card className="w-full shadow-modern-2xl border-border/50">
                            <form onSubmit={handleSubmit}>
                                <CardHeader className="space-y-2">
                                    <CardTitle className="text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                                        {t('volunteer.formTitle')}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {t('volunteer.formDescription')}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* First Name */}
                                        <div className="space-y-2.5">
                                            <Label className="font-semibold">
                                                {t('volunteer.formFirstNameLabel')}
                                            </Label>
                                            <Input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="John"
                                                className="h-12 rounded-xl border-2"
                                            />
                                            {getError("firstName") && (
                                                <p className="text-sm text-destructive">
                                                    {getError("firstName")}
                                                </p>
                                            )}
                                        </div>

                                        {/* Last Name */}
                                        <div className="space-y-2.5">
                                            <Label className="font-semibold">
                                                {t('volunteer.formLastNameLabel')}
                                            </Label>
                                            <Input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                className="h-12 rounded-xl border-2"
                                            />
                                            {getError("lastName") && (
                                                <p className="text-sm text-destructive">
                                                    {getError("lastName")}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formEmailLabel')}
                                        </Label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john.doe@example.com"
                                            className="h-12 rounded-xl border-2"
                                        />
                                        {getError("email") && (
                                            <p className="text-sm text-destructive">
                                                {getError("email")}
                                            </p>
                                        )}
                                    </div>

                                    {/* phoneNumber */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formPhoneLabel')}
                                        </Label>
                                        <Input
                                            name="phoneNumber"
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="(123) 456-7890"
                                            className="h-12 rounded-xl border-2"
                                        />
                                    </div>

                                    {/* Position */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formPositionLabel')}
                                        </Label>

                                        <Select
                                            value={formData.positionOfInterest}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, positionOfInterest: value })
                                            }
                                        >
                                            <SelectTrigger className="h-12 rounded-xl border-2">
                                                <SelectValue
                                                    placeholder={
                                                        language === 'ar'
                                                            ? 'اختر منصباً'
                                                            : 'Select a position'
                                                    }
                                                />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {positionsState.map((pos) => (
                                                    <SelectItem key={pos.$id} value={pos.$id}>
                                                        {language === 'ar'
                                                            ? pos.titleAr
                                                            : pos.titleEn}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {getError("positionOfInterest") && (
                                            <p className="text-sm text-destructive">
                                                {getError("positionOfInterest")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formMotivationLabel')}
                                        </Label>
                                        <Textarea
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t('volunteer.formMotivationPlaceholder')}
                                            className="rounded-xl border-2 resize-none"
                                        />
                                        {getError("message") && (
                                            <p className="text-sm text-destructive">
                                                {getError("message")}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-6">
                                    <Button
                                        type="submit"
                                        variant="accent"
                                        className="w-full h-14 text-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...')
                                            : t('volunteer.formSubmitButton')}
                                    </Button>
                                </CardFooter>
                            </form>

                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
