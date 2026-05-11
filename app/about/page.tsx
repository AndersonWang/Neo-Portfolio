import type { Metadata } from "next";
import AboutIntro      from "@/components/sections/about/AboutIntro";
import AboutExperience from "@/components/sections/about/AboutExperience";
import AboutSocial     from "@/components/sections/about/AboutSocial";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Product Designer with 10 years shipping products for 1M+ users — on design systems, curiosity, mountains, and what's behind the next peak.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutIntro />
      <AboutExperience />
      <AboutSocial />
    </main>
  );
}
