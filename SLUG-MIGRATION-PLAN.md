# Slug Migration Plan — Dutch Long-Tail SEO Slugs

## Goal
Rename all slugs to better Dutch long-tail SEO versions.
Same slug for all languages (simple rename, no per-language logic).
Keep existing architecture — just change the slug strings.

## Slug Mappings

### Static Pages
| Old | New |
|-----|-----|
| `/new` | `/nieuwe-cam-girls` |
| `/top` | `/populairste-cam-girls` |
| `/categories` | `/categorieen` |
| `/countries` | `/landen` |
| `/languages` | `/talen` |
| `/niche-videos` | `/videos` |
| `/blog` | `/blog` (keep) |
| `/contact` | `/contact` (keep) |

### Keyword Pages
| Old | New |
|-----|-----|
| `webcamsex` | `webcamsex` (keep) |
| `gratis-webcam-sex` | `gratis-webcam-sex` (keep) |
| `sexchat` | `sexchat` (keep) |
| `cam-girls` | `cam-girls` (keep) |
| `live-sex-cams` | `live-sex-cams` (keep) |

### Category Pages
| Old | New |
|-----|-----|
| `webcamsex-teen-18-plus` | `jonge-cam-girls-18-plus` |
| `webcamsex-milf` | `milf-webcamsex-ervaren-vrouwen` |
| `webcamsex-mature` | `mature-webcamsex-oudere-vrouwen` |
| `webcamsex-asian` | `aziatische-cam-girls-live` |
| `webcamsex-latina` | `latina-cam-girls-live` |
| `webcamsex-ebony` | `ebony-cam-girls-live` |
| `webcamsex-grote-borsten` | `cam-girls-grote-borsten` |
| `webcamsex-kleine-borsten` | `petite-cam-girls-kleine-borsten` |
| `webcamsex-anal` | `anale-cam-shows-live` |
| `webcamsex-koppels` | `cam-koppels-live-sex` |
| `webcamsex-squirt` | `squirt-cam-shows-live` |
| `webcamsex-bdsm` | `bdsm-bondage-cam-shows` |
| `webcamsex-tattoo` | `getatoeeerde-cam-girls` |
| `webcamsex-hairy` | `behaarde-cam-girls-natural` |
| `webcamsex-voeten` | `voeten-fetish-cam-shows` |
| `webcamsex-outdoor` | `outdoor-cam-shows-buiten` |
| `webcamsex-mobiel` | `mobiele-cam-shows-live` |

### Country Pages
| Old | New |
|-----|-----|
| `webcamsex-nederland` | `nederlandse-cam-girls` |
| `webcamsex-belgie` | `belgische-cam-girls` |
| `webcamsex-duitsland` | `duitse-cam-girls` |
| `webcamsex-colombia` | `colombiaanse-cam-girls` |
| `webcamsex-roemenie` | `roemeense-cam-girls` |
| `webcamsex-italie` | `italiaanse-cam-girls` |
| `webcamsex-spanje` | `spaanse-cam-girls` |
| `webcamsex-frankrijk` | `franse-cam-girls` |
| `webcamsex-verenigd-koninkrijk` | `britse-cam-girls` |
| `webcamsex-verenigde-staten` | `amerikaanse-cam-girls` |
| `webcamsex-rusland` | `russische-cam-girls` |
| `webcamsex-oekraine` | `oekraiense-cam-girls` |
| `webcamsex-brazilie` | `braziliaanse-cam-girls` |
| `webcamsex-japan` | `japanse-cam-girls` |
| `webcamsex-polen` | `poolse-cam-girls` |
| `webcamsex-mexico` | `mexicaanse-cam-girls` |
| `webcamsex-tsjechie` | `tsjechische-cam-girls` |
| `webcamsex-filipijnen` | `filipijnse-cam-girls` |
| `webcamsex-thailand` | `thaise-cam-girls` |

### Pages That Stay The Same
- Platform pages: `live-sex-cams-cam4`, `live-sex-cams-chaturbate`, etc.
- Comparison pages: `chaturbate-vs-stripchat`, etc.
- Language pages: `webcamsex-in-het-nederlands`, etc.
- Niche video detail slugs: from CAM4 API, keep as-is (just parent path changes from `niche-videos` to `videos`)

## Files to Change

### 1. `src/data/categoryPages.ts`
- Change the key of each entry (e.g., `"webcamsex-teen-18-plus"` → `"jonge-cam-girls-18-plus"`)
- Change the first arg to `cat()` (the slug string) to the new slug
- That's it — no structural changes

### 2. `src/data/countryPages.ts`
- For hand-written countries (nederland, belgie, colombia): change key and slug arg to `c()`
- For `remainingCountries` array: change the `slug` field
- The `slug` field also gets set in the generated data, so update the loop to use new slug pattern
- Pattern for remaining: `${adjective.toLowerCase()}-cam-girls` with slugified adjective

### 3. `src/App.tsx`
- Update all `<Route path="...">` to use new slugs
- Static pages: `new` → `nieuwe-cam-girls`, `top` → `populairste-cam-girls`, etc.
- Category routes: all 17 category slugs
- `niche-videos` → `videos` and `niche-videos/:slug` → `videos/:slug`
- Country routes use catch-all `*` so no explicit changes needed there
- Add redirect routes for all old slugs (Navigate to new slug)

### 4. `src/components/Header.tsx`
- Update nav links: `/new` → `/nieuwe-cam-girls`, `/top` → `/populairste-cam-girls`
- `/niche-videos` → `/videos`
- `/categories` → `/categorieen`, `/countries` → `/landen`

### 5. `src/components/Footer.tsx`
- Update all hardcoded slug references
- Footer content paths: `/top`, `/new`, `/webcamsex-milf`, `/webcamsex-latina`, etc.
- Footer links section

### 6. `src/pages/CategoryLanding.tsx`
- The hardcoded `categoryPages` object at the top: update all keys and slug fields
- Cross-links at bottom: update slug references to other categories
- Also update references like `localePath("/webcamsex")` and `localePath("/live-sex-cams")`

### 7. `src/pages/Categories.tsx`
- Update links to individual category pages

### 8. `src/pages/Countries.tsx`
- Update links to individual country pages

### 9. `src/pages/CountryLanding.tsx`
- Update slug references and cross-links

### 10. `src/pages/KeywordLanding.tsx`
- Update cross-links to categories, countries, etc.

### 11. `src/pages/NicheVideos.tsx` and `src/pages/NicheDetail.tsx`
- Update path references from `niche-videos` to `videos`

### 12. `scripts/generate-sitemap.mjs`
- Update all slug entries to new values

### 13. `scripts/prerender.mjs`
- Update all slug entries to new values

### 14. Other files
Search all .tsx/.ts files for any remaining old slug references:
```bash
grep -rn "webcamsex-teen\|webcamsex-milf\|webcamsex-mature\|webcamsex-asian\|webcamsex-latina\|webcamsex-ebony\|webcamsex-grote\|webcamsex-kleine\|webcamsex-anal\|webcamsex-koppels\|webcamsex-squirt\|webcamsex-bdsm\|webcamsex-tattoo\|webcamsex-hairy\|webcamsex-voeten\|webcamsex-outdoor\|webcamsex-mobiel\|webcamsex-nederland\|webcamsex-belgie\|webcamsex-duitsland\|webcamsex-colombia\|webcamsex-roemenie\|webcamsex-italie\|webcamsex-spanje\|webcamsex-frankrijk\|webcamsex-verenigd\|webcamsex-verenigde\|webcamsex-rusland\|webcamsex-oekraine\|webcamsex-brazilie\|webcamsex-japan\|webcamsex-polen\|webcamsex-mexico\|webcamsex-tsjechie\|webcamsex-filipijnen\|webcamsex-thailand\|/niche-videos\|\"niche-videos\"\|'/niche-videos'\|\"/top\"\|'/top'\|\"/new\"\|'/new'\|\"/categories\"\|'/categories'\|\"/countries\"\|'/countries'\|\"/languages\"\|'/languages'" src/ scripts/
```

### 15. Redirect Component
Add a redirect handler in App.tsx for old URLs. Use React Router's `Navigate`:
```tsx
// Old slug redirects
<Route path="webcamsex-teen-18-plus" element={<Navigate to="/jonge-cam-girls-18-plus" replace />} />
<Route path="webcamsex-milf" element={<Navigate to="/milf-webcamsex-ervaren-vrouwen" replace />} />
// ... etc for all old slugs
```

## Notes
- Do NOT touch `src/data/slugRegistry.ts` — delete it, it's no longer needed
- Do NOT change platform page slugs
- Do NOT change comparison page slugs
- Do NOT change language page slugs
- Do NOT change keyword page slugs (they're already fine)
- Run `npm install` first if node_modules is missing
- After all changes, run `npx tsc --noEmit` to check TypeScript
- Do NOT build or deploy
