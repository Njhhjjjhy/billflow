import { Hero, FeaturesSection, BottomCTA, FloatingElements } from "@/components/landing";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FloatingElements variant="hero-to-features" />
      <FeaturesSection />
      <FloatingElements variant="features-to-cta" />
      <BottomCTA />
    </>
  );
}
