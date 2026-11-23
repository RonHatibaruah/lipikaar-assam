/**
 * Legacy Font to Unicode Converter for Assamese DTP
 * Standardizing 8-bit ASCII fonts (Geetanjali, Ramdhenu, Lipi) to Unicode UTF-8 (U+0980 - U+09FF)
 */

interface GlyphMap {
  [key: string]: string;
}

// Representative ASCII-to-Unicode mapping for Geetanjali / Ramdhenu legacy DTP keys
const GEETANJALI_TO_UNICODE: GlyphMap = {
  'A': 'অ', 'B': 'আ', 'C': 'ই', 'D': 'ঈ', 'E': 'উ', 'F': 'ঊ', 'G': 'ঋ',
  '1': 'এ', 'I': 'ঐ', 'J': 'ও', 'K': 'ঔ',
  'k': 'ক', 'L': 'খ', 'g': 'গ', 'N': 'ঘ', 'O': 'ঙ',
  'c': 'চ', 'P': 'ছ', 'j': 'জ', 'Q': 'ঝ', 'R': 'ঞ',
  'T': 'ট', 'S': 'ঠ', 'd': 'ড', 'U': 'ঢ', 'V': 'ণ',
  't': 'ত', 'X': 'থ', 'Y': 'দ', 'Z': 'ধ', 'n': 'ন',
  'p': 'প', 'f': 'ফ', 'b': 'ব', 'v': 'ভ', 'm': 'ম',
  'y': 'য', 'r': 'ৰ', 'l': 'ল', 'w': 'ৱ',
  's': 'শ', 'M': 'ষ', 'h': 'স', 'H': 'হ',
  'x': 'ক্ষ', 'q': 'ড়', 'W': 'ঢ়', 'e': 'য়',
  // Matras & modifiers
  'a': 'া', 'i': 'ি', 'u': 'ু', 'o': 'ো',
  '`': 'ঁ', '~': 'ং', ':': 'ঃ', '/': '্'
};

// Common legacy non-Unicode garbled string patterns
export const SAMPLE_LEGACY_SNIPPETS = [
  {
    name: 'Geetanjali Sample (Assam Gazette Draft)',
    legacy: 'Ahbm crkbr - Ardr bby dhI gbfrnr',
    previewExpected: 'অসম চৰকাৰ - Order by the Governor'
  },
  {
    name: 'Ramdhenu Notification Excerpt',
    legacy: 'Ahbm rbxptR: AxIhUcnb nK: AAP.42/2026/18',
    previewExpected: 'অসম ৰাজপত্ৰ: অধিসূচনা নং: AAP.42/2026/18'
  }
];

export function convertLegacyToUnicode(text: string, font: 'geetanjali' | 'ramdhenu' | 'auto' = 'auto'): string {
  if (!text) return '';

  // Check if text is already standard Unicode Assamese (contains characters in range U+0980 - U+09FF)
  const unicodeAssameseRegex = /[\u0980-\u09FF]/;
  if (unicodeAssameseRegex.test(text) && !/[A-Za-z]{4,}/.test(text)) {
    return text; // Already Unicode
  }

  let converted = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (GEETANJALI_TO_UNICODE[char]) {
      converted += GEETANJALI_TO_UNICODE[char];
    } else {
      converted += char;
    }
  }

  // Common post-processing for matra placement in legacy transliteration
  // (In legacy fonts, 'i' matra was typed before the consonant)
  converted = converted.replace(/ি([ক-হড়-য়])/g, '$1ি');

  return converted;
}
