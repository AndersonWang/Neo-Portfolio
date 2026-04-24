import Hero        from "@/components/sections/home/Hero";
import SelectedWork from "@/components/sections/home/SelectedWork";
import About        from "@/components/sections/home/About";
import ContactCTA   from "@/components/sections/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <About />
      <ContactCTA />
    </main>
  );
}
