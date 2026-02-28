import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
      <Card className="max-w-md w-full text-center shadow-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">Payment Cancelled</h1>
          
          <p className="text-muted-foreground">
            Your payment was not completed and your card has not been charged. 
            Your reservation is not finalized until a payment has been made.
          </p>

          <div className="pt-6 w-full space-y-3">
            <Link href="/properties" passHref>
              <Button className="w-full h-12 gap-2" variant="default">
                <ArrowLeft className="w-4 h-4" /> Browse Properties Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
