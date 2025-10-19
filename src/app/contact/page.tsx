import { Mail, Phone, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { faqItems } from "@/lib/data";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help. Whether you have a question about donations, volunteering, or our work, please reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
             <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Send us a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane.doe@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Question about a campaign" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" placeholder="Please type your message here..." rows={5} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Our Headquarters</h3>
                    <p>123 Hope Street, Unity City, 10001, World</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email Support</h3>
                    <a href="mailto:support@hopeharbor.org" className="hover:text-primary transition-colors">support@hopeharbor.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Phone Support</h3>
                    <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
           <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Find quick answers to common questions.
            </p>
          </div>
           <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </div>
    </div>
  );
}
