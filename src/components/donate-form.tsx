"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BitcoinIcon, Loader2, Zap } from "@/components/icons";

const formSchema = z.object({
  name: z.string().optional(),
  amount: z.coerce
    .number({ invalid_type_error: "Please enter a number." })
    .min(1, { message: "Donation must be at least 1 sat." })
    .max(1000000, { message: "Donation cannot exceed 1,000,000 sats." }),
});

interface DonateFormProps {
  onCreateInvoice: (amount: number, name?: string) => Promise<void>;
  isSubmitting: boolean;
}

export function DonateForm({ onCreateInvoice, isSubmitting }: DonateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 1000,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCreateInvoice(values.amount, values.name);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Zap className="h-6 w-6 text-primary" />
          Create Your Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Satoshi Nakamoto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" placeholder="1000" {...field} className="pl-8"/>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <BitcoinIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Invoice"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
