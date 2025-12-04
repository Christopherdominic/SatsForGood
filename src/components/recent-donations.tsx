import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Donation } from "@/lib/types";
import { BitcoinIcon } from './icons';

interface RecentDonationsProps {
  donations: Donation[];
}

export function RecentDonations({ donations }: RecentDonationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Donations</CardTitle>
      </CardHeader>
      <CardContent>
        {donations.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {donation.donor_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{donation.donor_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono flex justify-end items-center gap-1">
                    {donation.amount_sats.toLocaleString()}
                    <BitcoinIcon className="h-3 w-3 text-primary" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(donation.paid_at), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No donations yet. Be the first!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
