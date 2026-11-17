import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FONTS, getFont } from "@/lib/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { MetaBlock } from "@/components/MetaBlock";
import { Story } from "@/components/Story";
import { Specimen } from "@/components/Specimen";
import { GlyphSet } from "@/components/GlyphSet";
import { TestTool } from "@/components/TestTool";
import { UsageGallery } from "@/components/UsageGallery";
import { LicenseFaq } from "@/components/LicenseFaq";
import { SiteFooter } from "@/components/SiteFooter";

export function generateStaticParams() {
  return FONTS.map((font) => ({ slug: font.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const font = getFont(slug);
  if (!font) return {};
  return { title: `${font.name} — ${font.designer}`, description: font.tagline };
}

export default async function FontPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const font = getFont(slug);
  if (!font) notFound();

  return (
    <>
      <SiteHeader font={font} />
      <main className="flex-1">
        <Hero font={font} />
        <MetaBlock font={font} />
        <Story font={font} />
        <Specimen font={font} />
        <GlyphSet font={font} />
        <TestTool font={font} />
        <UsageGallery font={font} />
        <LicenseFaq font={font} />
      </main>
      <SiteFooter />
    </>
  );
}
