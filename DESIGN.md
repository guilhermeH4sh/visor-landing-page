---
name: VISOR Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#56423d'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#89726c'
  outline-variant: '#ddc0b9'
  surface-tint: '#9e4127'
  primary: '#9b3f25'
  on-primary: '#ffffff'
  primary-container: '#bb563b'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb5a1'
  secondary: '#6a5d43'
  on-secondary: '#ffffff'
  secondary-container: '#f0debd'
  on-secondary-container: '#6e6147'
  tertiary: '#5d5c5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#757474'
  on-tertiary-container: '#f7feff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a1'
  on-primary-fixed: '#3b0800'
  on-primary-fixed-variant: '#7f2a12'
  secondary-fixed: '#f3e0c0'
  secondary-fixed-dim: '#d6c4a5'
  on-secondary-fixed: '#231a06'
  on-secondary-fixed-variant: '#51452d'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is rooted in high-fashion editorial aesthetics, specifically tailored for a premium eyewear brand. It balances the warmth of artisanal craftsmanship with the precision of contemporary minimalism. The UI should evoke a sense of quiet luxury, focusing on the architectural qualities of the products.

The visual style utilizes a **Minimalist** foundation with **Glassmorphism** accents to maintain a lightweight, sophisticated feel. It prioritizes clarity, generous whitespace, and a high-contrast relationship between product photography and structural elements. The emotional response should be one of aspiration, trust, and effortless style.

## Colors

The palette is inspired by natural earth tones and high-fashion materials.

*   **Primary (Terracotta):** Used strategically for calls to action, active states, and brand-defining accents.
*   **Secondary (Sand):** Used for subtle background sections, hover states on light surfaces, and softer borders.
*   **Neutral (Black/White):** The core framework for editorial layouts and typography.

## Typography

*   **Headlines:** Playfair Display
*   **Body & Utility:** Hanken Grotesk
*   **Labels:** label-caps (Hanken Grotesk)

## Layout & Spacing

Fixed grid on desktop (12 columns, 64px margins), 8px base unit, large section gaps (120px+). Mobile uses 4 columns with 20px margins.


---

## Migração do template (2026-08)

A implementação visual ativa passou a ser o HTML consolidado da home (`index.html`), com mídia em `assets/template/`.

Diretrizes mantidas:

- Primária terracotta / tipografia editorial
- Hero full-bleed
- Navegação sem sobreposição de marca
- Evolução incremental de interação sem regressão visual
