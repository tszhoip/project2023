import Image from "next/image";
import { FONT } from "@/lib/font";

export function UsageGallery() {
  return (
    <section id="usage" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-sm uppercase tracking-wide text-muted">In use</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FONT.usageImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-lg border border-border">
              <Image
                src={img.src}
                alt={img.alt}
                width={1500}
                height={750}
                className="h-auto w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
