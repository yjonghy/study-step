# Portfolio Design System

## Direction

An editorial engineering field: warm paper for context, near-black for technical depth, and a single deep orange for active decisions. The work itself leads; project evidence replaces ornamental imagery.

## Typography

- Family: self-hosted SUIT Variable (`public/fonts/SUIT-Variable.woff2`)
- Display: 700–800 weight, compact line height, maximum tracking `-0.04em`
- Body: 400–700 weight, Korean-first word breaking and generous line height
- Technical labels remain small only when their contrast meets the body-text threshold

## Color Tokens

- Paper: `#f0efe9`
- Ink: `#11110f`
- Accent: `#b82e00`
- Muted on paper: `#616059`
- Muted on ink: `#b5b4ac` or lighter
- Structural rule on ink: `#5f5f59`

## Composition

- First viewport pairs the career thesis with an authored signal board.
- Featured work is a replacement board: project tabs change one detailed case rather than stacking equal cards.
- Case evidence follows thesis → ordered flow → problem/design/result → proof.
- The complete twelve-project range appears as a restrained archive after the deep cases.

## Interaction

- Project tabs implement the ARIA tab pattern with roving focus and Arrow/Home/End navigation.
- One orchestrated signal-bar rise is the page’s principal motion.
- Reduced-motion environments remove entrance animation and transitions.
- Focus uses a three-pixel accent outline with visible offset.

## Responsive Behavior

- At narrow widths, the hero stacks, featured tabs become a horizontal strip, flows become a two-column sequence, and archive rows become single-column.
- No horizontal document overflow at 390px or 1440px.

## Constraints

- Do not introduce generic card grids, glass effects, gradient text, decorative section numbering, or eyebrow labels above headings.
- Keep commercial claims and metrics limited to verified resume evidence.
- Preserve the deep-orange, ink, and paper field across future portfolio surfaces.
