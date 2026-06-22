import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import InteractiveDemos from "@/components/InteractiveDemos";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <InteractiveDemos />
      <Skills />
      <Contact />
    </main>
  );
}
