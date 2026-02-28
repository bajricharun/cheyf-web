'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <section className="py-24 bg-background border-t border-border/50" id="contact">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions about booking one of our properties or considering our management services? Our team is here to help 24/7.
            </p>
            <div className="space-y-4 pt-4">
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <p className="text-muted-foreground">info@cheyfstays.com</p>
              </div>
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <p className="text-muted-foreground">+387 61 123 456</p>
              </div>
              <div>
                <h4 className="font-semibold">Office</h4>
                <p className="text-muted-foreground">Sarajevo City Center Area, BiH</p>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-xl border border-border/50">
            <CardHeader className="pb-4">
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>We typically reply within a few hours.</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="p-6 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-lg text-center animate-fade-in">
                  <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
                      <Input id="firstName" required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message <span className="text-destructive">*</span></label>
                    <textarea 
                      id="message" 
                      required 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
