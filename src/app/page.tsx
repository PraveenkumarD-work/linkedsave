import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
import { TrustedBy } from "@/components/marketing/TrustedBy";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Features } from "@/components/marketing/Features";
import { Assistant } from "@/components/marketing/Assistant";
import { CreateStudio } from "@/components/marketing/CreateStudio";
import { Connect } from "@/components/marketing/Connect";
import { Story } from "@/components/marketing/Story";
import { Pricing } from "@/components/marketing/Pricing";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Testimonials />
        <Features />
        <Assistant />
        <CreateStudio />
        <Connect />
        <Story />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
