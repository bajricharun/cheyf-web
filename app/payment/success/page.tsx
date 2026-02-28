import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { submitReservation } from '@/app/actions/book';

// Note: Next.js page taking searchParams
export default async function PaymentSuccessPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const orderNumber = searchParams?.order_number as string;
  const customParamsStr = searchParams?.custom_params as string;
  
  let bookingResult = null;
  let parsedParams = null;

  if (customParamsStr) {
    try {
      parsedParams = JSON.parse(customParamsStr);
      
      // Construct FormData to reuse the existing submitReservation action
      const formData = new FormData();
      formData.append('propertyId', String(parsedParams.propertyId));
      if (parsedParams.unitTypeId) formData.append('unitTypeId', String(parsedParams.unitTypeId));
      formData.append('checkIn', parsedParams.checkIn);
      formData.append('checkOut', parsedParams.checkOut);
      formData.append('guests', String(parsedParams.guests));
      formData.append('fullName', parsedParams.fullName || 'Guest');
      formData.append('email', parsedParams.email || 'guest@example.com');
      
      const noteAppend = `[MONRI PAYMENT SUCCESS] Order: ${orderNumber}. Original Note: ${parsedParams.note || ''}`;
      formData.append('note', noteAppend);

      // Attempt reservation creation
      bookingResult = await submitReservation(null, formData);
      
    } catch (e) {
      console.error('Failed to parse custom_params or create reservation', e);
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
      <Card className="max-w-md w-full text-center shadow-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">Payment Successful</h1>
          
          <p className="text-muted-foreground whitespace-pre-line">
            Thank you for your payment. Your transaction <strong>{orderNumber}</strong> was approved.
            
            {bookingResult?.success ? (
              <span className="block mt-4 text-green-600 dark:text-green-400 font-semibold">
                Your reservation at Cheyf Stays has been officially confirmed! Check your email for details.
              </span>
            ) : (
              <span className="block mt-4 text-yellow-600 dark:text-yellow-400">
                Payment received, but there was an issue syncing your reservation instantly: {bookingResult?.error}. Our team will contact you shortly to finalize the dates.
              </span>
            )}
          </p>

          <div className="pt-6 w-full">
            <Link href="/" passHref>
              <Button className="w-full h-12 gap-2" variant="default">
                Return to Homepage <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
