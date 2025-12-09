import { Zap } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto flex items-center justify-center px-4 py-6">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Powered by Bitcoin Lightning Network 
        </p>
      </div>
    </footer>
  );
}
