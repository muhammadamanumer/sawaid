import { redirect } from 'next/navigation'
import { i18n } from '@/i18n-config'

// This is the root page, which redirects to the default language's homepage.
export default function RootPage() {
  redirect(i18n.defaultLocale)
}
