/**
 * Combined gender-specific content overrides for category/niche pages.
 * When a gender filter (man/koppel/trans) is active, these overrides
 * replace the default (female) h1, description, content, and FAQ.
 */

import type { GenderOverride } from "./genderContentMale";
import { maleOverrides } from "./genderContentMale";
import { coupleOverrides } from "./genderContentCouple";
import { transOverrides } from "./genderContentTrans";

export type { GenderOverride };

const allOverrides: Record<string, Record<string, GenderOverride>> = {
  male: maleOverrides,
  couple: coupleOverrides,
  trans: transOverrides,
};

/**
 * Get the gender-specific content override for a niche page.
 * Returns undefined if no override exists for the given slug + gender combo.
 */
export function getGenderOverride(
  slug: string,
  gender: "male" | "couple" | "trans",
): GenderOverride | undefined {
  return allOverrides[gender]?.[slug];
}
