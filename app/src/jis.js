// JIS (Japanese) keyboard legends for ZMK keycodes.
//
// The OS interprets HID usages according to the active layout: with a JIS
// layout the same usage produces a different character than on a US layout.
// Keys not listed here produce the same character on both layouts.
//
// Keyed by the canonical keycode name (`names[0]` in zmk-keycodes.json).
export const JIS_LEGENDS = {
  // ---- unshifted keys whose JIS output differs from US ----
  GRAVE: { symbol: '半/全', description: '半角/全角 (JIS)' },
  EQUAL: { symbol: '^', description: '^ (JIS)' },
  LEFT_BRACKET: { symbol: '@', description: '@ (JIS)' },
  RIGHT_BRACKET: { symbol: '[', description: '[ (JIS)' },
  BACKSLASH: { symbol: ']', description: '] (JIS)' },
  NON_US_HASH: { symbol: ']', description: '] (JIS)' },
  SINGLE_QUOTE: { symbol: ':', description: ': (JIS)' },
  CAPSLOCK: { symbol: '英数', description: '英数/CapsLock (JIS)' },

  // ---- shifted keycodes (LS(...)) whose JIS output differs from US ----
  AT_SIGN: { symbol: '"', description: '" (JIS: Shift+2)' },
  CARET: { symbol: '&', description: '& (JIS: Shift+6)' },
  AMPERSAND: { symbol: "'", description: "' (JIS: Shift+7)" },
  ASTERISK: { symbol: '(', description: '( (JIS: Shift+8)' },
  LEFT_PARENTHESIS: { symbol: ')', description: ') (JIS: Shift+9)' },
  UNDERSCORE: { symbol: '=', description: '= (JIS: Shift+-)' },
  PLUS: { symbol: '~', description: '~ (JIS: Shift+^)' },
  LEFT_BRACE: { symbol: '`', description: '` (JIS: Shift+@)' },
  RIGHT_BRACE: { symbol: '{', description: '{ (JIS: Shift+[)' },
  PIPE: { symbol: '}', description: '} (JIS: Shift+])' },
  COLON: { symbol: '+', description: '+ (JIS: Shift+;)' },
  DOUBLE_QUOTES: { symbol: '*', description: '* (JIS: Shift+:)' },
  TILDE: { symbol: '半/全', description: 'Shift+半角/全角 (JIS)' },

  // ---- Japanese-specific keys ----
  INTERNATIONAL_1: { symbol: 'ろ', description: 'ろ / _ (JIS)' },
  INTERNATIONAL_2: { symbol: 'かな', description: 'カタカナ/ひらがな (JIS)' },
  INTERNATIONAL_3: { symbol: '¥', description: '¥ / | (JIS)' },
  INTERNATIONAL_4: { symbol: '変換', description: '変換 (JIS)' },
  INTERNATIONAL_5: { symbol: '無変換', description: '無変換 (JIS)' },
  LANG1: { symbol: 'かな', description: 'かな (Mac JIS)' },
  LANG2: { symbol: '英数', description: '英数 (Mac JIS)' }
}
