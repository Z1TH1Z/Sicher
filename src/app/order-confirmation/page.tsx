import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader>
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold">Thank you for your order!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order has been placed successfully. A confirmation email has been sent to you.
          </p>
          <p className="text-lg font-semibold">
            Order Number: <span className="text-primary">ST-{Math.floor(Math.random() * 90000) + 10000}</span>
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/track-order">Track Your Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
