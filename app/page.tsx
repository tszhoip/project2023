import { SiteHeader } from "@/components/SiteHeader";
import { Catalog } from "@/components/Catalog";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <h1 className="max-w-2xl text-2xl leading-snug md:text-4xl">
              Fonts by MHZ Design Office. One price, web license, updates included.
            </h1>
            <p className="mt-4 text-sm text-muted">
              Type in any block to try every font. Change the size and colours, then open a font
              for the full specimen.
            </p>
          </div>
        </section>
        <Catalog />
      </main>
      <SiteFooter />
    </>
  );
}
