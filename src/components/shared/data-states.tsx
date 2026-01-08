"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorState({ 
  title, 
  message, 
  onRetry, 
  showRetry = true 
}: ErrorStateProps) {
  const { language } = useTranslation();
  
  const defaultTitle = language === 'ar' 
    ? 'حدث خطأ' 
    : 'Something went wrong';
  
  const defaultMessage = language === 'ar'
    ? 'تعذر تحميل البيانات. الرجاء المحاولة مرة أخرى.'
    : 'Failed to load data. Please try again.';
  
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="p-4 bg-destructive/10 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold text-destructive mb-2">
            {title || defaultTitle}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {message || defaultMessage}
          </p>
          {showRetry && onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ message, size = 'md' }: LoadingStateProps) {
  const { language } = useTranslation();
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };
  
  const defaultMessage = language === 'ar' 
    ? 'جاري التحميل...' 
    : 'Loading...';
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`animate-spin rounded-full border-4 border-muted border-t-primary ${sizeClasses[size]} mb-4`} />
      <p className="text-muted-foreground animate-pulse">
        {message || defaultMessage}
      </p>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  const { language } = useTranslation();
  
  const defaultTitle = language === 'ar' 
    ? 'لا توجد بيانات' 
    : 'No data found';
  
  const defaultMessage = language === 'ar'
    ? 'لا توجد عناصر لعرضها حالياً.'
    : 'There are no items to display at this time.';
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="p-4 bg-muted rounded-full mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">
        {title || defaultTitle}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {message || defaultMessage}
      </p>
      {action && (
        action.href ? (
          <Button asChild variant="default">
            <a href={action.href}>{action.label}</a>
          </Button>
        ) : (
          <Button variant="default" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}

interface DataWrapperProps<T> {
  data: T[] | null | undefined;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  emptyAction?: EmptyStateProps['action'];
  loadingMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
  children: (data: T[]) => React.ReactNode;
}

/**
 * A wrapper component that handles loading, error, and empty states
 */
export function DataWrapper<T>({
  data,
  isLoading,
  error,
  onRetry,
  emptyTitle,
  emptyMessage,
  emptyIcon,
  emptyAction,
  loadingMessage,
  errorTitle,
  errorMessage,
  children,
}: DataWrapperProps<T>) {
  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title={errorTitle}
        message={errorMessage || error} 
        onRetry={onRetry}
      />
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <EmptyState 
        title={emptyTitle}
        message={emptyMessage}
        icon={emptyIcon}
        action={emptyAction}
      />
    );
  }
  
  return <>{children(data)}</>;
}
