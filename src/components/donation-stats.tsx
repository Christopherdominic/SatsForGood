import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BitcoinIcon, Users } from "@/components/icons";

interface DonationStatsProps {
  totalSats: number;
  donorCount: number;
}

export function DonationStats({ totalSats, donorCount }: DonationStatsProps) {
  return (
    <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-8">
            Dashboard
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sats Donated</CardTitle>
                <BitcoinIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">
                    {totalSats.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                    Making a big impact
                </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">
                    {donorCount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                    Thank you for your support!
                </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
