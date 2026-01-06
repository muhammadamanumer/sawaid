"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface ZakatBadgeProps {
  supported: boolean;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  variant?: "default" | "outline" | "minimal";
  className?: string;
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
  className,
}: ZakatBadgeProps) {
  const { language } = useTranslation();
  const isArabic = language === "ar";

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
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

  const label = supported
    ? labels.supported[isArabic ? "ar" : "en"]
    : labels.notSupported[isArabic ? "ar" : "en"];

  const Icon = supported ? (showIcon ? Sparkles : CheckCircle2) : XCircle;

  return (
    <Badge
      variant="outline"
      className={cn(
        "transition-colors font-medium inline-flex items-center gap-1",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {showIcon && (
        <Icon className={cn(iconSizes[size], isArabic ? "ml-1" : "mr-1")} />
      )}
      <span>{label}</span>
    </Badge>
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
