import type { Metadata } from "next";
import { getCaseStudiesBySpecialty } from "@/lib/mdx";
import WorkHero from "@/components/sections/work/WorkHero";
import SpecialtySection from "@/components/sections/work/SpecialtySection";

export const metadata: Metadata = {
  title:       "Work",
  description: "Selected case studies in design systems, product design, and prototyping by Anderson Wang — Senior Product Designer.",
};

export default function WorkPage() {
  const dsStudies    = getCaseStudiesBySpecialty("design-systems");
  const dpStudies    = getCaseStudiesBySpecialty("design-process");
  const protoStudies = getCaseStudiesBySpecialty("prototyping");
  const totalCount   = dsStudies.length + dpStudies.length + protoStudies.length;

  return (
    <main
      className="page-gutter"
      style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}
    >
      <WorkHero totalCount={totalCount} />

      <SpecialtySection
        index="01"
        label="Design Systems"
        heading="Design Systems"
        description="I architect token systems, component libraries, and governance processes that let teams move faster without breaking consistency. The work is as much organizational design as it is visual craft."
        tagColor="amethyst"
        caseStudies={dsStudies}
      />

      <SpecialtySection
        index="02"
        label="Design Process"
        heading="Design Process"
        description="End-to-end product design — from ambiguous brief through research, ideation, and iteration to a shipped experience. I stay close to the problem and the people who have it."
        tagColor="gold"
        caseStudies={dpStudies}
      />

      <SpecialtySection
        index="03"
        label="Prototyping"
        heading="Prototyping"
        description="High-fidelity prototypes in Framer, Origami, code, or AI-assisted tooling. I build to think, build to test, and build to hand off with zero ambiguity."
        tagColor="peridot"
        caseStudies={protoStudies}
        isLast
      />
    </main>
  );
}
