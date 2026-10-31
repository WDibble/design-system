import { IconGallery } from "@/components/demo/icon-gallery";

export function IconDirectorySection() {
  return (
    <section id="icon-directory" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
            12
          </span>
          <span>Complete Kinetic Icon Spectrum &amp; Directory</span>
        </h2>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Explore all 470 animated icons with mechanical spring physics, instant search, category
          filtering, dynamic sliding pagination, and one-click import snippet copying.
        </p>
      </div>

      <IconGallery />
    </section>
  );
}
