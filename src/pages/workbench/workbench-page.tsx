import {
  HeroBanner,
  ButtonSpectrum,
  BadgesSpectrum,
  CardsLighting,
  FormsSpectrum,
  OverlaysSpectrum,
  NavigationDataSpectrum,
  MaterialsFeedbackSpectrum,
  InteractionsSpectrum,
  AnalyticsLayoutSpectrum,
  AdvancedPrimitivesSection,
  IconDirectorySection,
} from "./sections";

interface WorkbenchPageProps {
  isDark: boolean;
  onToggleDark: (targetDark?: boolean) => void;
  onOpenCommand: () => void;
  navigateTo: (path: string) => void;
}

export function WorkbenchPage({
  isDark,
  onToggleDark,
  onOpenCommand,
  navigateTo,
}: WorkbenchPageProps) {
  return (
    <>
      <HeroBanner />
      <ButtonSpectrum />
      <BadgesSpectrum />
      <CardsLighting />
      <FormsSpectrum />
      <OverlaysSpectrum />
      <NavigationDataSpectrum
        isDark={isDark}
        onToggleDark={onToggleDark}
        onOpenCommand={onOpenCommand}
        navigateTo={navigateTo}
      />
      <MaterialsFeedbackSpectrum />
      <InteractionsSpectrum />
      <AnalyticsLayoutSpectrum />
      <AdvancedPrimitivesSection />
      <IconDirectorySection />
    </>
  );
}
