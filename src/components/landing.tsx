import { Button } from "@/components/ui/button";
import { Zap } from "@/components/icons";

interface LandingProps {
  onDonateNowClick: () => void;
}

export function Landing({ onDonateNowClick }: LandingProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-24 text-center sm:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-[-10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(247,147,26,0.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(191,90,242,0.15),rgba(255,255,255,0))]"></div>
        </div>
        <div className="relative z-10">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            SatsForGood
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Donate small sats. Make a big impact.
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-muted-foreground/80">
            This is a demonstration app using the Bitcoin Lightning Network on{" "}
            <strong>Testnet only</strong>. No real money is used.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={onDonateNowClick} size="lg">
              <Zap className="mr-2" />
              Donate Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
