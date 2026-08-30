import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/router";

export function NotFoundPage() {
  return (
    <div className="space-y-4 py-12 text-center">
      <p className="text-muted-foreground text-6xl font-semibold">404</p>
      <h1 className="text-xl font-medium">Страница не найдена</h1>
      <div>
        <Link to="/" className={buttonVariants({ variant: "outline" })}>
          На главную
        </Link>
      </div>
    </div>
  );
}
