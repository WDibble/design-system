import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheckIcon } from "@/components/icons";

export function BadgesSpectrum() {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-2xl">
          <ShieldCheckIcon size={18} />
          Badge Spectrum & Status Indicators
        </h2>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 pt-6">
          <Badge variant="default">Default Pill</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline Specular</Badge>
          <Badge variant="success" dot>
            Live Production
          </Badge>
          <Badge variant="destructive" dot>
            Incident Active
          </Badge>
          <Badge variant="outline" size="sm">
            COUNT: 4,892
          </Badge>
          <Badge variant="secondary" size="sm">
            v1.9.0
          </Badge>
        </CardContent>
      </Card>
    </section>
  );
}
