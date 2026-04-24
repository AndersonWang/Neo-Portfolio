import type { Metadata } from "next";
import DSHero       from "@/components/sections/ds/DSHero";
import DSColors     from "@/components/sections/ds/DSColors";
import DSTypography from "@/components/sections/ds/DSTypography";
import DSMotion     from "@/components/sections/ds/DSMotion";
import DSComponents from "@/components/sections/ds/DSComponents";
import DSEffects    from "@/components/sections/ds/DSEffects";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Neo Design System — a 3-tier token architecture powering Anderson Wang's portfolio. Colors, typography, motion, and components, all documented.",
};

export default function DesignSystemPage() {
  return (
    <main>
      <DSHero />
      <DSColors />
      <DSTypography />
      <DSMotion />
      <DSComponents />
      <DSEffects />
    </main>
  );
}
