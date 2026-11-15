import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { MetaBlock } from "@/components/MetaBlock";
import { Story } from "@/components/Story";
import { Specimen } from "@/components/Specimen";
import { TestTool } from "@/components/TestTool";
import { UsageGallery } from "@/components/UsageGallery";
import { LicenseFaq } from "@/components/LicenseFaq";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <MetaBlock />
        <Story />
        <Specimen />
        <TestTool />
        <UsageGallery />
        <LicenseFaq />
      </main>
      <SiteFooter />
    </>
  );
}
