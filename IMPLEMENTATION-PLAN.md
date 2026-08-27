# Startvagina SEO Expansion — LemonCams Strategie

## Doel
Van ~243 naar 1.500+ geïndexeerde pagina's met unieke content per pagina.

## Fase 1: Categorie Uitbreiding + Platform Combo's (VANDAAG)

### 1A: Nieuwe categorie/tag pagina's (+13)
Huidige 17 → 30 categorieën:
- blonde-cam-girls
- brunette-cam-girls  
- roodharige-cam-girls
- curvy-cam-girls-bbw
- slanke-cam-girls
- hd-cam-shows
- cam-girls-20-plus
- cam-girls-30-plus
- cam-girls-40-plus
- interracieve-cam-shows
- creampie-cam-shows
- deepthroat-cam-shows
- lovense-cam-shows

### 1B: Platform × Categorie combo pagina's (NIEUW)
Route: `/:platform-cams/:category`
Voorbeeld: `/chaturbate-cams/milf`, `/stripchat-cams/asian`

Platforms (8) × Top categorieën (26) = ~208 pagina's
Elk met unieke intro + content + FAQ

### 1C: Robots.txt + Sitemap update
- Allow platform-cams/* 
- Disallow diepere nesting
- Sitemap uitbreiden met alle nieuwe URLs

## Fase 2: Gender Combo's + Land Uitbreiding

### 2A: Gender × Categorie pagina's (NIEUW)
Route: `/vrouwen/:category`, `/mannen/:category`, `/koppels/:category`, `/trans/:category`
4 genders × 26 categorieën = ~104 pagina's

### 2B: Landenpagina's uitbreiden
Van 16 → 80+ landen (alle landen met cam modellen)

### 2C: Taal-speaking pagina's (NIEUW)
Route: `/nederlands-sprekend`, `/frans-sprekend`, etc.
~30 talen

## Fase 3: Blog + Doorlopend
- Blog content plan (2-4 posts per week)
- Meer niche combo's
- Seizoensgebonden content

## Technische Architectuur

### Nieuwe bestanden:
- `src/pages/PlatformCategoryLanding.tsx` — platform × category combo
- `src/pages/GenderCategoryLanding.tsx` — gender × category combo  
- `src/pages/LanguageSpeakingLanding.tsx` — taal-speaking pagina's
- `src/data/platformCategoryData.ts` — content voor platform × category
- `src/data/genderCategoryData.ts` — content voor gender × category
- `src/data/newCategories.ts` — extra categorieën toevoegen aan categoryPages.ts

### Route structuur:
```
/:platform-cams                 → PlatformLanding (bestaand)
/:platform-cams/:category       → PlatformCategoryLanding (NIEUW)
/vrouwen/:category              → GenderCategoryLanding (NIEUW)
/mannen/:category               → GenderCategoryLanding (NIEUW)
/koppels/:category              → GenderCategoryLanding (NIEUW)
/trans/:category                → GenderCategoryLanding (NIEUW)
/:language-sprekend             → LanguageSpeakingLanding (NIEUW)
```
