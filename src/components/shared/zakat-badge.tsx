"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface ZakatBadgeProps {
  supported: boolean;
  size?: "sm" | "md" | "lg" | "card";
  showIcon?: boolean;
  variant?: "default" | "outline" | "minimal" | "solid";
  icon?: "sparkles" | "check";
  labelOverride?: string;
  className?: string;
  showFatwaInfo?: boolean;
  fatwaBarcodeSrc?: string;
  fatwaBarcodeAlt?: string;
}

/**
 * ZakatBadge - Displays Zakat eligibility status
 * 
 * 🟢 Green: "Zakat Supported" / "✓ زكاة"
 * 🔴 Red: "Not Zakat Eligible" / "✗ غير مؤهل للزكاة"
 */
export function ZakatBadge({
  supported,
  size = "md",
  showIcon = true,
  variant = "default",
  icon = "sparkles",
  labelOverride,
  className,
  showFatwaInfo = false,
  fatwaBarcodeSrc,
  fatwaBarcodeAlt,
}: ZakatBadgeProps) {
  const { language } = useTranslation();
  const isArabic = language === "ar";

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
    card: "text-xs px-3 py-1.5",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
    card: "h-4 w-4",
  };

  const variantClasses = {
    default: supported
      ? "bg-green-500/10 text-green-600 border-green-500/50 hover:bg-green-500/20"
      : "bg-red-500/10 text-red-600 border-red-500/50 hover:bg-red-500/20",
    outline: supported
      ? "bg-transparent text-green-600 border-green-500 hover:bg-green-500/10"
      : "bg-transparent text-red-600 border-red-500 hover:bg-red-500/10",
    minimal: supported
      ? "bg-green-500/5 text-green-600 border-transparent"
      : "bg-red-500/5 text-red-600 border-transparent",
    solid: supported
      ? "bg-primary/95 text-primary-foreground border-0 shadow-modern-md backdrop-blur-sm"
      : "bg-destructive/95 text-destructive-foreground border-0 shadow-modern-md backdrop-blur-sm",
  };

  const labels = {
    supported: {
      en: "Zakat Supported",
      ar: "✓ زكاة",
    },
    notSupported: {
      en: "Not Zakat Eligible",
      ar: "✗ غير مؤهل للزكاة",
    },
  };

  const label = labelOverride || (supported
    ? labels.supported[isArabic ? "ar" : "en"]
    : labels.notSupported[isArabic ? "ar" : "en"]);

  const supportedIcon = icon === "check" ? CheckCircle2 : Sparkles;
  const Icon = supported ? supportedIcon : XCircle;

  const fatwaText = isArabic
    ? "يمكن التبرع من أموال الزكاة تحت بند ﴿وَفِــي سَــبِيلِ اللهِ﴾، وذلك وفقاً لما جاء في قرار مجلس المجمع الفقهي الإسلامي، في دورته الثامنة المنعقدة بمكة المكرمة فيما بين 27 ربيع الآخر 1405هــ و 8 جمادى الأولى 1405 هـــ ، وجاء فيه:\nفإنّ المجلس يقرر بالأكثرية المطلقة دخول الدعوة إلى الله تعالى، وما يعين عليها، ويدعم أعمالها، في معنى ﴿وَفِــي سَــبِيلِ اللهِ﴾ في الآية الكريمة."
    : "Zakat funds may be donated under the category of \"Fi Sabilillah\" (in the cause of Allah),\nin accordance with the ruling issued by the Islamic Fiqh Council during its eighth session, held in Makkah between 27 Rabi al-Thani 1405 AH and 8 Jumada al-Ula 1405 AH, The ruling stated:\nThe Council, by absolute majority, has decided that da'wah (calling people to Allah), along with the means that support and strengthen its work, falls within the meaning of \"Fi Sabililah\" - (For the Cause of Allah) mentioned in the noble verse.";

  const showFatwaTooltip = supported && showFatwaInfo;
  const fatwaBarcodeAltText = fatwaBarcodeAlt || (isArabic ? "باركود الفتوى" : "Fatwa barcode");

  const badge = (
    <Badge
      variant="outline"
      tabIndex={showFatwaTooltip ? 0 : undefined}
      aria-label={label}
      className={cn(
        "transition-colors font-medium inline-flex items-center gap-1",
        sizeClasses[size],
        variantClasses[variant],
        showFatwaTooltip ? "cursor-help" : "",
        className
      )}
    >
      {showIcon && (
        <Icon className={cn(iconSizes[size], isArabic ? "ml-1" : "mr-1")} />
      )}
      <span>{label}</span>
    </Badge>
  );

  if (!showFatwaTooltip) {
    return badge;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="center"
          sideOffset={10}
          collisionPadding={12}
          className="max-w-[min(420px,calc(100vw-24px))] max-h-[70vh] overflow-y-auto rounded-xl border border-border/60 bg-popover/95 p-4 text-sm leading-relaxed shadow-modern-xl backdrop-blur-md"
        >
          <div className={cn("space-y-4", isArabic ? "text-right" : "text-left")}>
            <p className="text-muted-foreground whitespace-pre-line" dir={isArabic ? "rtl" : "ltr"}>
              {fatwaText}
            </p>
            {fatwaBarcodeSrc && (
              <div className="pt-3 border-t border-border/60">
                <Image
                  src={fatwaBarcodeSrc}
                  alt={fatwaBarcodeAltText}
                  width={260}
                  height={120}
                  className="mx-auto h-auto w-full max-w-[260px] rounded-md bg-background/70 p-2 shadow-modern"
                />
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * ZakatStamp - A larger, more prominent Zakat indicator
 * Used on campaign/program detail pages
 */
interface ZakatStampProps {
  supported: boolean;
  className?: string;
}

export function ZakatStamp({ supported, className }: ZakatStampProps) {
  const { language } = useTranslation();
  const isArabic = language === "ar";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md",
        supported
          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
          : "bg-gradient-to-r from-red-500 to-red-600 text-white",
        className
      )}
    >
      {supported ? (
        <>
          <CheckCircle2 className="h-5 w-5" />
          <span>{isArabic ? "مؤهل للزكاة" : "Zakat Eligible"}</span>
        </>
      ) : (
        <>
          <XCircle className="h-5 w-5" />
          <span>{isArabic ? "غير مؤهل للزكاة" : "Not Zakat Eligible"}</span>
        </>
      )}
    </div>
  );
}

export default ZakatBadge;
