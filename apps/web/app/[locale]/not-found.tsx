import { Link } from "@/i18n/navigation";
import { NewsletterInput } from "~/components/newsletter-input.client";
import { Card, CardContent, CardHeader, CardTitle } from "@synoem/ui/components/card";
import { getTranslations } from "next-intl/server";
import { Button } from "@synoem/ui/components/button";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground max-w-md">{t("description")}</div>

            <NewsletterInput />
            <Button asChild variant="link">
              <Link href="/">{t("returnHome")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
