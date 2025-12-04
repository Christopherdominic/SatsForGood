"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getInvoiceStatus } from "@/lib/api";
import type { Invoice, InvoiceStatus } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Loader2, CheckCircle, ArrowLeft, Zap } from "lucide-react";

interface InvoiceQRProps {
  invoice: Invoice;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

export function InvoiceQR({ invoice, onPaymentSuccess, onBack }: InvoiceQRProps) {
  const [status, setStatus] = useState<InvoiceStatus["status"]>("PENDING");
  const [isPolling, setIsPolling] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(async () => {
      try {
        const result = await getInvoiceStatus(invoice.payment_hash);
        if (result.status === "PAID") {
          setStatus("PAID");
          setIsPolling(false);
          onPaymentSuccess();
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error polling for invoice status:", error);
        // Optionally stop polling on error
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [invoice.payment_hash, onPaymentSuccess, isPolling]);

  const handleCopy = () => {
    navigator.clipboard.writeText(invoice.invoice);
    toast({
      title: "Copied to clipboard!",
      description: "Invoice has been copied.",
    });
  };
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(invoice.invoice)}&size=256x256&bgcolor=f3f4f6&color=000000&qzone=1`;

  return (
    <Card className="relative overflow-hidden">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={onBack}>
            <ArrowLeft />
        </Button>

      <CardHeader>
        <CardTitle className="text-center font-headline flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Pay with Lightning
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative rounded-lg bg-gray-200 p-4">
            <Image
                src={qrCodeUrl}
                alt="Lightning Invoice QR Code"
                width={256}
                height={256}
                priority
            />
        </div>
        
        <div className="w-full space-y-2">
            <div className="relative">
            <Input
                readOnly
                value={invoice.invoice}
                className="pr-10 text-xs text-muted-foreground"
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={handleCopy}
            >
                <Copy className="h-4 w-4" />
            </Button>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
            {status === "PENDING" ? (
                <div className="flex items-center justify-center gap-2 text-primary">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-semibold">Waiting for payment...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Payment Successful!</span>
                </div>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
