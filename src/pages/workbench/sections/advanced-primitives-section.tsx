import { AdvancedPrimitivesShowcase } from "@/components/demo/advanced-primitives-showcase";

export function AdvancedPrimitivesSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
            11
          </span>
          <span>Contextual Surfaces, Hierarchical Trees &amp; Advanced Inputs</span>
        </h2>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Base UI combobox autocomplete, accessible radio groups, tactile keycaps, desktop-grade
          context menus, rich hover preview cards, swipeable bottom drawers, file dropzones,
          chronological audit streams, and recursive file trees.
        </p>
      </div>

      <AdvancedPrimitivesShowcase />
    </section>
  );
}
