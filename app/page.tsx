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
            <h1 className="max-w-3xl text-[24px] leading-[1.2] font-medium">
              Fonts by MHZ Design Office. One price, web license, updates included.
              <span className="mt-6 block">
                Type in any block to try every font. Change the colours, then open a font
                for the full specimen.
              </span>
            </h1>
          </div>
        </section>
        <Catalog />
      </main>
      <SiteFooter />
    </>
  );
}
