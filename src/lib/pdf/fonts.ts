import { Font } from "@react-pdf/renderer";

// For MVP, use built-in fonts that are guaranteed to work
// Built-in fonts: Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique,
// Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique,
// Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic

// Hyphenation callback to prevent weird line breaks in words
Font.registerHyphenationCallback((word) => [word]);

// Font families to use in the PDF
// Uses built-in fonts for reliable rendering
export const fontFamilies = {
  display: "Helvetica-Bold",  // Bold sans-serif for headers
  body: "Helvetica",          // Regular sans-serif for body text
  mono: "Courier",            // Monospace for numbers/codes
};

// Note: For Chinese character support, you would need to:
// 1. Download Noto Sans TC font files (TTF format)
// 2. Place them in public/fonts/
// 3. Register them using Font.register with local file paths
// Example:
// Font.register({
//   family: "Noto Sans TC",
//   src: "/fonts/NotoSansTC-Regular.ttf",
// });
