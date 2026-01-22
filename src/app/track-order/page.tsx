"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

const trackOrderSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

type OrderStatus = {
  id: string;
  status: string;
  details: string;
  estimatedDelivery: string;
};

export default function TrackOrderPage() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

  const form = useForm<z.infer<typeof trackOrderSchema>>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: { orderId: '' },
  });

  const onSubmit = (values: z.infer<typeof trackOrderSchema>) => {
    // Mock API call
    setOrderStatus({
      id: values.orderId,
      status: 'Shipped',
      details: 'Your order is on its way. It left our fulfillment center on Nov 16, 2023.',
      estimatedDelivery: 'November 22, 2023',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex justify-center">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Track Your Order</CardTitle>
            <CardDescription>Enter your order ID below to see its status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                <FormField control={form.control} name="orderId" render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="sr-only">Order ID</FormLabel>
                    <FormControl><Input placeholder="e.g., ST-12345" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit">Track Order</Button>
              </form>
            </Form>

            {orderStatus && (
              <div className="mt-8">
                <Separator />
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">Order Status for #{orderStatus.id}</h3>
                  <p><span className="font-medium">Status:</span> {orderStatus.status}</p>
                  <p><span className="font-medium">Details:</span> {orderStatus.details}</p>
                  <p><span className="font-medium">Estimated Delivery:</span> {orderStatus.estimatedDelivery}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
