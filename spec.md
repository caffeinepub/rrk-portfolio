# RRK Portfolio — Mobile Responsiveness & PDF Fix

## Current State
The portfolio is a React/TSX single-page app with a dark cyberpunk aesthetic. Most layout styles are inline (not CSS classes), which means media queries in index.css cannot override them. The nav hides links on mobile but has no hamburger menu. The hero, experience, skills, projects, contact, and footer sections use fixed `padding: '120px 60px'` that does not adapt. The projects grid uses `minmax(450px, 1fr)` which overflows on phones. The contact form name/email row is a hardcoded 2-column grid. The hero stats block is `position: absolute; right: 60px; bottom: 60px` causing overlap on small screens. The resume download link points to `/assets/uploads/ROHAN-RAJ-KAPOOR-FULLSTACK-1-1.pdf` with the `download` attribute.

## Requested Changes (Diff)

### Add
- Hamburger menu button (3-line icon, 44px touch target) visible only on mobile
- Mobile nav drawer/overlay that opens on hamburger tap, closes on link click or outside tap
- `safe-area-inset` support in index.html viewport meta and CSS padding
- CSS class `section-pad` replacing inline section padding, responsive at 480/768/1200px
- Fluid `clamp()` typography for hero-name, section-title, hero-desc already in CSS
- `nav-hamburger` and `nav-mobile-menu` CSS classes

### Modify
- `index.html`: add `viewport-fit=cover` to viewport meta
- `App.tsx`: replace all inline `padding: '120px 60px'` with className `section-pad`, add hamburger state + button, fix projects grid minmax to `minmax(min(450px, 100%), 1fr)`, fix skills grid similarly, fix form grid to stack on mobile via class, fix hero stats absolute positioning issue, fix footer inline padding
- `index.css`: add comprehensive mobile-first breakpoints (480, 768, 1200px), add `.section-pad`, `.nav-hamburger`, `.nav-mobile-menu` styles, safe-area-inset padding, fix hero stats on mobile, fix contact layout on mobile, ensure all touch targets >= 44px, fix horizontal overflow
- Resume download link: verify and correct path; ensure proper `download` attribute and file is accessible

### Remove
- Inline `padding` / layout styles from section JSX that are now managed by CSS classes
- `display: none` on `.nav-links` for mobile replaced by proper hamburger pattern

## Implementation Plan
1. Update `src/frontend/index.html` — add `viewport-fit=cover` to viewport meta
2. Update `src/frontend/src/index.css` — add all mobile breakpoints, hamburger styles, section-pad, safe-area-inset, hero-stats mobile fix, no horizontal scroll
3. Rewrite `src/frontend/src/App.tsx` — add hamburger menu state, use CSS classes for layout, fix grids, fix resume download path
4. Validate (lint + build)
