import PageTransition from "@/components/layout/PageTransition";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import SystemGraph from "@/components/home/SystemGraph";
import ExperienceSnapshot from "@/components/home/ExperienceSnapshot";
import GithubActivity from "@/components/home/GithubActivity";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <PageTransition>
      {/* 01 Hero */}
      <Hero />

      {/* 02 Editorial Intro Note */}
      <section className="w-full px-6 sm:px-12 md:px-16 py-20 border-b border-white/10 bg-neutral-950/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
          <div className="lg:col-span-4 font-mono text-xs text-neutral-400 tracking-widest uppercase">
            // CORE PHILOSOPHY
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6">
            <p className="text-2xl sm:text-3xl md:text-4xl text-neutral-200 font-light leading-snug tracking-tight">
              &ldquo;I build software systems, experiment with emerging technology, and turn technically complicated ideas into usable, reliable products.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl">
              Focusing on low-level system design, machine learning pipelines, automation tooling, and cloud infrastructure. Based in Chennai, graduating in 2027 from SRM Institute of Science and Technology.
            </p>
          </div>
        </div>
      </section>

      {/* 03 Selected Work */}
      <SelectedWork />

      {/* 04 Systems & Skills Connected Graph */}
      <SystemGraph />

      {/* 05 Experience Snapshot */}
      <ExperienceSnapshot />

      {/* 06 GitHub & Telemetry Activity */}
      <GithubActivity />

      {/* 07 Contact CTA */}
      <ContactCTA />
    </PageTransition>
  );
}
