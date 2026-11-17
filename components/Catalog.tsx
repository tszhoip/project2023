"use client";

import { useState } from "react";
import { FONTS } from "@/lib/fonts";
import { FontBlock } from "./FontBlock";

/** The home page list: one block per font, all sharing a single editable text. */
export function Catalog() {
  const [text, setText] = useState(FONTS[0].previewText);

  return (
    <div>
      {FONTS.map((font) => (
        <FontBlock key={font.slug} font={font} text={text} onTextChange={setText} />
      ))}
    </div>
  );
}
