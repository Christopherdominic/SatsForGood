import type { Invoice, Donation } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// ✅ Create Lightning Invoice
export async function createInvoice(amount: number, name?: string): Promise<Invoice> {
  const res = await fetch(`${API_BASE}/api/create-invoice/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount_sats: amount,
      donor_name: name || "Anonymous",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create invoice");
  }

  return res.json();
}

// ✅ Get Recent Donations
export async function getRecentDonations(): Promise<Donation[]> {
  const res = await fetch(`${API_BASE}/api/recent-donations/`);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

// ✅ Get Donation Stats
export async function getDonationStats(): Promise<{ totalSats: number; donorCount: number }> {
  const res = await fetch(`${API_BASE}/api/donation-stats/`);

  if (!res.ok) {
    return { totalSats: 0, donorCount: 0 };
  }

  return res.json();
}

// ✅ Check Invoice Payment Status
export async function getInvoiceStatus(paymentHash: string) {
  const res = await fetch(
    `${API_BASE}/api/invoice-status/${paymentHash}/`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch invoice status");
  }

  return res.json();
}

