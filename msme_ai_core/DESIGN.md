---
name: MSME AI Core
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4e5e81'
  primary: '#031635'
  on-primary: '#ffffff'
  primary-container: '#1a2b4b'
  on-primary-container: '#8293b8'
  inverse-primary: '#b6c6ef'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#001c10'
  on-tertiary: '#ffffff'
  tertiary-container: '#003320'
  on-tertiary-container: '#00a774'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b6c6ef'
  on-primary-fixed: '#081b3a'
  on-primary-fixed-variant: '#364768'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code-md:
    fontFamily: jetbrainsMono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style

The design system is engineered to function as an "AI-powered business operating system." The brand personality is authoritative yet accessible, positioning the product as a reliable co-pilot for small to medium enterprise management. 

The visual style follows **Modern Corporate Minimalism** with a focus on high information density and technical precision. It prioritizes clarity and utility over decorative elements. The aesthetic is defined by:
- **Professionalism:** A deep, stable color palette that inspires confidence.
- **Intelligence:** Systematic layouts and consistent iconography that suggest an organized, data-driven environment.
- **Trust:** Clear borders, ample white space, and a refined use of depth to make complex B2B workflows feel manageable.

## Colors

The palette is anchored by **Deep Navy**, used for high-level branding and primary typography to establish authority. **Professional Blue** serves as the functional accent color, reserved strictly for interactive elements and primary calls to action.

- **Success/Warning/Error:** Used sparingly for semantic feedback. These colors are slightly desaturated to maintain a professional, non-alarmist tone.
- **Surfaces:** The system utilizes a tiered background strategy. `#FFFFFF` is used for the primary content canvas, while `#F8FAFC` is used for global backgrounds and sidebars to provide a soft distinction between navigation and workspace.
- **Borders:** `#E2E8F0` is the standard for structural containment, ensuring high legibility in dense data tables and forms.

## Typography

The design system utilizes **Inter** for all UI elements to ensure maximum legibility and a neutral, systematic feel. 

- **Hierarchy:** Use `title-md` for standard card headers and `body-md` for general content to maintain high density without sacrificing readability.
- **Scale:** On mobile devices, `headline-lg` should drop to 24px to prevent excessive line wrapping in narrow containers.
- **Labels:** `label-md` is used for table headers, metadata, and tiny button text, often in uppercase with slight letter spacing to differentiate it from body copy.

## Layout & Spacing

This design system employs a **Fluid Grid** model based on a 4px baseline.

- **Desktop (1440px+):** 12-column grid with 24px margins and 16px gutters.
- **Tablet (768px - 1439px):** 8-column grid with 16px margins and 16px gutters.
- **Mobile (<767px):** 4-column grid with 16px margins and 12px gutters.

The spacing rhythm is tight to accommodate information-rich dashboards. Use `md` (16px) for standard padding within cards and containers, and `sm` (8px) for grouping related internal elements.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** supplemented by **Ambient Shadows**.

1.  **Level 0 (Base):** Background color `#F8FAFC`. Used for the underlying canvas.
2.  **Level 1 (Card):** White surface `#FFFFFF` with a 1px border of `#E2E8F0`. No shadow. Used for standard dashboard tiles.
3.  **Level 2 (Active):** White surface with a subtle, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`. Used for hovered cards and secondary buttons.
4.  **Level 3 (Overlay):** High-elevation shadow for modals and dropdowns to create distinct separation from the workspace.

Avoid heavy blurs or colorful glows to maintain the professional B2B aesthetic.

## Shapes

The design system uses a **Rounded** shape language to soften the corporate tone and make the AI feel approachable.

- **Standard UI Elements:** Buttons, Inputs, and Chips use a 0.5rem (8px) radius.
- **Container Elements:** Dashboard cards, Modals, and Main content areas use `rounded-xl` (1.5rem / 24px) to create a modern "contained" feel.
- **Selection Indicators:** Use pill-shapes (full rounding) for status indicators to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Professional Blue background, white text. `rounded-lg` (8px) corners.
- **Secondary:** White background, 1px Border (#E2E8F0), Deep Navy text.
- **Ghost:** No background or border, Deep Navy or Professional Blue text for low-priority actions.

### Input Fields
- White background with `#E2E8F0` border. On focus, the border changes to Professional Blue with a 2px outer glow (ring).
- Labels use `label-md` positioned above the field.

### Cards
- Use `rounded-xl` corners and 1px border. Internal padding should be `md` (16px).
- Headers should be separated by a subtle 1px divider if the card contains multiple data sections.

### Chips & Badges
- Used for status (Success, Warning, Error). Use a light tinted background (10% opacity of the status color) with high-contrast text for maximum legibility.

### Data Tables
- High-density layout. Row height set to 48px. 
- Use alternating row stripes or subtle borders. Header text should be `label-md` in Deep Navy with 50% opacity.

### AI Feedback Elements
- When AI is processing or suggesting, use a subtle Professional Blue border pulse or a specific "AI-spark" icon to denote intelligence-driven content.