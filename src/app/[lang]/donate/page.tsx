import { i18n } from "@/i18n-config";
import { DonateForm } from "@/components/donate-form";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function DonatePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Make a Donation</h1>
        <p className="mt-4 text-lg text-muted-foreground">Your generosity fuels our mission. Thank you for your support.</p>
      </div>
      <DonateForm />
      <p className="text-center text-sm text-muted-foreground mt-4">
        Your donation will be securely processed. An automated receipt will be sent to your email.
      </p>
    </div>
  );
}
