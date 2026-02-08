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
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(64, { message: "First name must not exceed 64 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(64, { message: "Last name must not exceed 64 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(7, { message: "Please enter a valid phone number" }).max(50, { message: "Phone number must not exceed 50 characters" }),
    positionId: z.string().min(1, { message: "Please select a position" }),
    country: z.string().min(2, { message: "Please enter your country" }).max(64, { message: "Country must not exceed 64 characters" }),
    dateOfBirth: z.string().refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 16 && age <= 100;
    }, { message: "You must be at least 16 years old" }),
    qualification: z.string().min(2, { message: "Please enter your qualification" }).max(64, { message: "Qualification must not exceed 64 characters" }),
    currentOccupation: z.string().min(2, { message: "Please enter your current occupation" }).max(64, { message: "Occupation must not exceed 64 characters" }),
    weeklyHours: z.number().min(1, { message: "Please enter at least 1 hour per week" }).max(168, { message: "Cannot exceed 168 hours per week" }),
    skills: z.string().max(256, { message: "Skills must not exceed 256 characters" }).optional(),
    volunteerExperience: z.string().max(256, { message: "Experience must not exceed 256 characters" }).optional(),
    message: z.string().max(2000, { message: "Message must not exceed 2000 characters" }).optional(),
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
        phone: "",
        positionId: "",
        country: "",
        dateOfBirth: "",
        qualification: "",
        currentOccupation: "",
        weeklyHours: 0,
        skills: "",
        volunteerExperience: "",
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
        setFormErrors({});

        try {
            // Validate the form data
            const validatedData = volunteerSchema.parse({
                ...formData,
                weeklyHours: Number(formData.weeklyHours) || 0,
            });
            
            // Submit the application
            const response = await submitVolunteerApplication(validatedData);
            
            console.log("Volunteer application submitted:", response);
            
            toast({
                title: language === 'ar' ? 'تم الإرسال بنجاح!' : 'Submitted Successfully!',
                description: language === 'ar' ? 'شكراً لتقديمك. سنكون على اتصال قريباً.' : 'Thank you for applying. We will be in touch soon.',
                duration: 5000,
                variant: 'default',
            });
            
            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                positionId: "",
                country: "",
                dateOfBirth: "",
                qualification: "",
                currentOccupation: "",
                weeklyHours: 0,
                skills: "",
                volunteerExperience: "",
                message: "",
            });
        } catch (error: any) {
            console.error("Volunteer Form submission error:", error);
            
            // Handle Zod validation errors
            if (error.errors) {
                const zodErrors: any = {};
                error.errors.forEach((err: any) => {
                    const field = err.path[0];
                    if (!zodErrors[field]) {
                        zodErrors[field] = [];
                    }
                    zodErrors[field].push(err.message);
                });
                setFormErrors(zodErrors);
            } 
            // Handle Appwrite/API errors
            else {
                toast({
                    title: language === 'ar' ? 'فشل الإرسال' : 'Submission Failed',
                    description: error.message || (language === 'ar' ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.' : 'An error occurred while submitting your application. Please try again.'),
                    duration: 5000,
                    variant: 'destructive',
                });
            }
        } finally {
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
                                            {t('volunteer.formPhoneLabel')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(123) 456-7890"
                                            className="h-12 rounded-xl border-2"
                                            required
                                        />
                                        {getError("phone") && (
                                            <p className="text-sm text-destructive">
                                                {getError("phone")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Country */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formCountryLabel')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            name="country"
                                            type="text"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder={language === 'ar' ? 'مثال: الأردن' : 'e.g., Jordan'}
                                            className="h-12 rounded-xl border-2"
                                            required
                                        />
                                        {getError("country") && (
                                            <p className="text-sm text-destructive">
                                                {getError("country")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formDateOfBirthLabel')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className="h-12 rounded-xl border-2"
                                            max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0]}
                                            required
                                        />
                                        {getError("dateOfBirth") && (
                                            <p className="text-sm text-destructive">
                                                {getError("dateOfBirth")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Qualification */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formQualificationLabel')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            name="qualification"
                                            type="text"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            placeholder={language === 'ar' ? 'مثال: بكالوريوس في علوم الحاسوب' : 'e.g., Bachelor of Computer Science'}
                                            className="h-12 rounded-xl border-2"
                                            required
                                        />
                                        {getError("qualification") && (
                                            <p className="text-sm text-destructive">
                                                {getError("qualification")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Current Occupation */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formCurrentOccupationLabel')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            name="currentOccupation"
                                            type="text"
                                            value={formData.currentOccupation}
                                            onChange={handleChange}
                                            placeholder={language === 'ar' ? 'مثال: مهندس برمجيات' : 'e.g., Software Engineer'}
                                            className="h-12 rounded-xl border-2"
                                            required
                                        />
                                        {getError("currentOccupation") && (
                                            <p className="text-sm text-destructive">
                                                {getError("currentOccupation")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Weekly Hours */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formWeeklyHoursLabel')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            name="weeklyHours"
                                            type="number"
                                            min="1"
                                            max="168"
                                            value={formData.weeklyHours || ""}
                                            onChange={handleChange}
                                            placeholder={language === 'ar' ? 'مثال: 10' : 'e.g., 10'}
                                            className="h-12 rounded-xl border-2"
                                            required
                                        />
                                        {getError("weeklyHours") && (
                                            <p className="text-sm text-destructive">
                                                {getError("weeklyHours")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Skills (Optional) */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formSkillsLabel')}
                                        </Label>
                                        <Textarea
                                            name="skills"
                                            rows={3}
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder={t('volunteer.formSkillsPlaceholder')}
                                            className="rounded-xl border-2 resize-none"
                                            maxLength={256}
                                        />
                                        {getError("skills") && (
                                            <p className="text-sm text-destructive">
                                                {getError("skills")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Volunteer Experience (Optional) */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formVolunteerExperienceLabel')}
                                        </Label>
                                        <Textarea
                                            name="volunteerExperience"
                                            rows={3}
                                            value={formData.volunteerExperience}
                                            onChange={handleChange}
                                            placeholder={t('volunteer.formVolunteerExperiencePlaceholder')}
                                            className="rounded-xl border-2 resize-none"
                                            maxLength={256}
                                        />
                                        {getError("volunteerExperience") && (
                                            <p className="text-sm text-destructive">
                                                {getError("volunteerExperience")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Position */}
                                    <div className="space-y-2.5">
                                        <Label className="font-semibold">
                                            {t('volunteer.formPositionLabel')} <span className="text-destructive">*</span>
                                        </Label>

                                        <Select
                                            value={formData.positionId}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, positionId: value })
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

                                        {getError("positionId") && (
                                            <p className="text-sm text-destructive">
                                                {getError("positionId")}
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
                                            maxLength={2000}
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
