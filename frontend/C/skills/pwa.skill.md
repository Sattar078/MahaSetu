# Professional Government Website & Progressive Web App Skill

## Purpose

Build and maintain a professional, trustworthy, accessible government-style website and Progressive Web App (PWA).

The application must:

* Look credible and institutional.
* Work smoothly on mobile, tablet, and desktop.
* Be installable on a phone home screen.
* Support offline-friendly behavior where appropriate.
* Follow accessibility best practices.
* Have excellent performance.
* Use consistent design patterns.
* Avoid unnecessary animations and visual clutter.
* Use minimal Copilot tokens by making targeted changes only.

---

# 1. Development Philosophy

Treat the application as a production government service, not a normal startup landing page.

Priorities:

1. Accessibility
2. Trust and clarity
3. Mobile usability
4. Performance
5. Security
6. Responsive design
7. Maintainability
8. Visual polish

Do not sacrifice accessibility or usability for visual effects.

---

# 2. UI / UX Requirements

## Government Design Language

The interface should communicate:

* Trust
* Stability
* Transparency
* Simplicity
* Accessibility
* Official/institutional quality

Prefer:

* Clean layouts
* Strong typography hierarchy
* High contrast
* Clear section separation
* Consistent spacing
* Simple navigation
* Recognizable icons
* Clear CTAs
* Informative labels

Avoid:

* Excessive gradients
* Excessive glassmorphism
* Neon colors
* Excessive shadows
* Excessive rounded cards
* Gaming-style UI
* Unnecessary animations
* Decorative elements that reduce clarity

---

# 3. Color System

Use a small, consistent design system.

Example:

```text
Primary: Government/institutional blue
Secondary: Indian-inspired accent where appropriate
Success: Accessible green
Warning: Accessible amber
Error: Accessible red
Background: Neutral/light
Text: High-contrast dark
```

Do not randomly choose colors for individual components.

Define reusable design tokens.

If the project already has a color system, preserve it.

Do not change existing branding unless explicitly requested.

---

# 4. Typography

Use a highly readable font.

Recommended characteristics:

* Excellent Devanagari/Latin support when multilingual content is required.
* Good readability on mobile.
* Clear distinction between headings and body text.

Maintain a consistent hierarchy:

```text
H1 → Page title
H2 → Major section
H3 → Subsection
Body → Main content
Small → Supporting information
```

Do not use tiny text for important information.

Avoid using font sizes below comfortable mobile readability unless necessary.

---

# 5. Responsive Design

The website MUST work on:

```text
Mobile
Tablet
Laptop
Desktop
Large desktop
```

Use a mobile-first approach.

Always test:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px+
```

Avoid:

* Horizontal scrolling
* Fixed-width layouts
* Overflowing buttons
* Text overlapping
* Tables breaking mobile layouts
* Navigation becoming unusable

---

# 6. Mobile Navigation

For mobile:

* Use a clear navigation pattern.
* Keep important actions easy to reach.
* Make buttons touch-friendly.
* Do not create tiny clickable elements.

Interactive elements should generally have a comfortable touch target.

Do not place critical actions too close together.

---

# 7. Accessibility

Follow WCAG-oriented practices.

Every meaningful image must have appropriate:

```html
alt="..."
```

Decorative images should use:

```html
alt=""
```

Use semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
<button>
<form>
<label>
```

Do not use `<div>` as a replacement for semantic interactive elements.

Buttons must be actual:

```html
<button>
```

Links must be actual:

```html
<a>
```

Do not use clickable `<div>` elements.

---

# 8. Keyboard Accessibility

All important functionality must work with keyboard navigation.

Ensure:

* Visible focus states
* Logical tab order
* Keyboard-accessible menus
* Keyboard-accessible dialogs
* Keyboard-accessible forms

Never remove focus outlines without replacing them with an accessible alternative.

---

# 9. Forms

Government forms must be extremely clear.

Every input should have:

```html
<label>
```

Provide:

* Clear field names
* Required/optional indicators
* Helpful validation messages
* Appropriate input types
* Error states
* Success states

Do not rely only on placeholder text as the field label.

Example:

```text
Full Name *
Enter your full name
```

not:

```text
[Enter your full name]
```

---

# 10. Error Handling

Errors should explain:

1. What went wrong.
2. Why it happened when useful.
3. What the user should do next.

Bad:

```text
Error 400
```

Better:

```text
We couldn't submit your application.
Please check the highlighted fields and try again.
```

Never expose:

* Stack traces
* Database errors
* API secrets
* Internal server information
* Debug information

to normal users.

---

# 11. Loading States

Never leave the user wondering whether an action worked.

Use appropriate:

* Skeletons
* Spinners
* Disabled submit buttons
* Progress indicators

For example:

```text
Submitting application...
```

instead of simply showing an inactive button.

Avoid unnecessary loading animations.

---

# 12. Government Information Architecture

Important government services should be easy to discover.

Recommended structure:

```text
Header
├── Government/Organization Identity
├── Main Navigation
├── Search
└── Important Actions

Main
├── Important Notices
├── Services
├── Citizen Information
├── Applications
├── Status Tracking
├── Announcements
└── Help / Contact

Footer
├── About
├── Contact
├── Accessibility
├── Privacy
├── Terms
├── Sitemap
└── Government/Organization information
```

Do not create complicated navigation when a simpler structure works.

---

# 13. Trust Indicators

Where appropriate, clearly show:

* Organization identity
* Official service name
* Contact information
* Last updated information
* Service status
* Privacy/security information
* Official links
* Application/reference numbers

Never fabricate government logos, certifications, departments, contact information, or official claims.

Use placeholder data when real information is unavailable.

---

# 14. PWA Requirements

The application MUST be a valid Progressive Web App.

Required components:

```text
Web App Manifest
Service Worker
HTTPS in production
Installable application behavior
Responsive UI
Offline strategy
App icons
Splash/startup metadata
```

---

# 15. Web App Manifest

Create a proper:

```text
manifest.webmanifest
```

or equivalent configuration.

It should contain appropriate:

```json
{
  "name": "Application Name",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#...",
  "description": "...",
  "icons": []
}
```

Use appropriate icon sizes.

At minimum, provide suitable:

```text
192x192
512x512
```

icons.

Use maskable icons when appropriate.

Do not use fake or unrelated icons.

---

# 16. Installation Behavior

The PWA should open in:

```text
display: standalone
```

when launched from the phone home screen.

The application should feel like an app rather than a browser page.

Avoid unnecessary browser-dependent UI.

Important content must still work when opened directly from the PWA.

---

# 17. Service Worker

Implement the service worker using the project's existing PWA architecture.

Do NOT manually create a complicated custom service worker if the project already uses a reliable PWA plugin.

For Vite projects, prefer the project's established PWA tooling when available.

The service worker should provide appropriate caching for:

* App shell
* Static assets
* Necessary fonts/icons
* Appropriate public resources

Do not blindly cache sensitive government/user data.

---

# 18. Offline Strategy

Offline behavior must be intentional.

Good candidates for caching:

```text
UI shell
Static assets
Public informational pages
Public help content
```

Do NOT cache sensitive personal information unless there is a clear security design for it.

When offline, show a useful message:

```text
You're offline.
Some services may be unavailable until your internet connection is restored.
```

Do not pretend that an online government service succeeded when it did not.

---

# 19. Network Requests

For API requests:

```text
Online → API
Offline → Appropriate fallback
```

Never silently lose user data.

For important forms:

* Detect connection problems.
* Inform the user.
* Prevent accidental duplicate submissions.
* Clearly communicate whether submission succeeded.

---

# 20. PWA Updates

The application should handle service-worker updates safely.

Do not silently break an active session.

If a new version is available, an appropriate notification can be shown:

```text
A new version is available.
Refresh to update.
```

Do not repeatedly force-refresh users.

---

# 21. Performance

Optimize for mobile networks.

Prioritize:

```text
Fast initial load
Small JavaScript bundles
Optimized images
Lazy loading
Code splitting
Caching
Minimal dependencies
```

Use:

```html
loading="lazy"
```

for appropriate non-critical images.

Do not lazy-load critical above-the-fold content unnecessarily.

---

# 22. Images

Optimize images before production.

Prefer modern formats where supported:

```text
WebP
AVIF
```

Use responsive image techniques where appropriate.

Always provide dimensions or aspect-ratio behavior to reduce layout shift.

Avoid unnecessarily huge images.

---

# 23. React Rules

If the project uses React:

* Use reusable components.
* Keep components focused.
* Avoid unnecessary re-renders.
* Use existing state-management patterns.
* Do not introduce Redux or another state library unless explicitly required.
* Reuse existing components before creating duplicates.

Prefer:

```text
components/
pages/
layouts/
hooks/
services/
utils/
assets/
```

when appropriate for the existing project.

Do not restructure the entire project unnecessarily.

---

# 24. API Integration

Keep API calls separated from UI components when practical.

Prefer a structure such as:

```text
services/
  api.js
  auth.js
  services.js
```

Do not duplicate Axios/fetch configuration throughout components.

Handle:

```text
loading
success
empty
error
offline
```

states.

Never expose:

```text
API secrets
private keys
JWT signing secrets
database credentials
```

in frontend code.

---

# 25. Authentication

For authenticated government services:

* Protect private routes.
* Handle expired sessions.
* Never expose sensitive user data unnecessarily.
* Do not store sensitive information in insecure client-side storage without a clear reason.
* Use secure server-side authentication architecture.

Never place secrets in:

```text
.env
```

files that are shipped to the browser.

Remember:

```text
VITE_* variables are exposed to frontend code.
```

Do not place private secrets in them.

---

# 26. Security

Never:

* Trust client-side validation alone.
* Render unsanitized HTML.
* Expose backend errors.
* Store secrets in Git.
* Commit `.env` files containing secrets.
* Disable security controls simply to make development easier.

Use server-side validation for all important data.

---

# 27. Search

Government portals often contain large amounts of information.

Search should:

* Be obvious.
* Be keyboard accessible.
* Work well on mobile.
* Provide useful empty states.
* Clearly communicate no results.

Example:

```text
No services found.

Try a different keyword or browse all services.
```

---

# 28. Tables

Government websites frequently use tables.

Desktop:

```text
Normal table
```

Mobile:

Prefer:

* Horizontal scrolling when the table must remain tabular.
* Responsive card transformation when appropriate.

Never allow tables to break the page layout.

---

# 29. Notifications

Use clear notification patterns:

```text
Success
Information
Warning
Error
```

Notifications should not disappear so quickly that users cannot read them.

Critical information should remain visible until acknowledged where appropriate.

---

# 30. Language Support

If multilingual support is required:

* Keep translations separate from components.
* Do not hardcode repeated UI text.
* Support Hindi/English or other required languages consistently.
* Ensure fonts support the selected scripts.
* Do not mix languages randomly.

Example:

```text
locales/
  en/
  hi/
```

---

# 31. Footer

The footer should provide useful navigation rather than decoration.

Potential sections:

```text
About
Services
Help
Contact
Accessibility
Privacy
Terms
Sitemap
```

Only include information that is actually available.

Never invent official government information.

---

# 32. Testing

Before considering the implementation complete, check:

### UI

* Mobile
* Tablet
* Desktop
* Navigation
* Forms
* Buttons
* Empty states
* Error states

### PWA

* Manifest
* Icons
* Service worker
* Installability
* Standalone launch
* Offline behavior
* Update behavior

### Accessibility

* Keyboard navigation
* Focus states
* Labels
* Alt text
* Heading hierarchy
* Contrast

### Performance

* Large images
* Unnecessary dependencies
* Bundle size
* Loading behavior

---

# 33. Lighthouse-Oriented Quality

Aim for strong Lighthouse results in:

```text
Performance
Accessibility
Best Practices
SEO
PWA
```

Do not optimize scores by breaking actual user experience.

Real usability takes priority over artificially maximizing Lighthouse numbers.

---

# 34. SEO

Use meaningful:

```html
<title>
<meta name="description">
```

Use semantic headings.

Create useful URLs.

Avoid:

```text
/page1
/page2
/test
```

Prefer:

```text
/services
/apply
/track-application
/notices
/contact
```

when appropriate.

---

# 35. Git Discipline

Do not mix unrelated changes into a feature.

Use meaningful commits:

```text
feat: add citizen service search
feat: make application installable
fix: improve mobile navigation
fix: handle offline state
refactor: extract service card component
```

Never commit:

```text
.env
node_modules/
dist/
build/
coverage/
```

unless there is an explicit reason.

---

# 36. Copilot Token Optimization

This is extremely important.

Before modifying code:

1. Inspect only the relevant files.
2. Understand the existing architecture.
3. Reuse existing components.
4. Make the smallest required change.
5. Do not rewrite working code.
6. Do not generate unnecessary comments.
7. Do not create unnecessary files.
8. Do not install dependencies unless required.
9. Do not explain every line.
10. Do not repeatedly inspect unchanged files.

Prefer targeted commands and targeted file reads.

Do NOT:

```text
Read the entire repository.
Rewrite the entire application.
Replace existing libraries without reason.
Create duplicate components.
Create unnecessary abstractions.
```

---

# 37. Existing Project Rule

Before introducing a new dependency, check whether the project already has a library that solves the problem.

Prefer existing:

```text
React
Vite
Tailwind
React Router
Axios
TanStack Query
React Hook Form
Zod
```

or the project's existing equivalents.

Do not introduce another library for the same purpose.

---

# 38. Change Scope

When the user asks for:

> Make the homepage professional

Only modify what is required for the homepage.

Do NOT automatically modify:

* Backend
* Authentication
* Database
* PWA configuration
* Unrelated pages
* Deployment configuration

unless the requested change requires it.

---

# 39. Completion Rule

After implementation, provide a concise summary:

```text
Implemented:
- <change 1>
- <change 2>
- <change 3>

PWA:
- Installable: <status>
- Manifest: <status>
- Service worker: <status>

Files changed:
- <file>
- <file>
```

Do not provide a long tutorial unless requested.

---

# 40. Default PWA Architecture

For a React + Vite application, prefer:

```text
src/
├── assets/
├── components/
├── layouts/
├── pages/
├── hooks/
├── services/
├── utils/
├── App.jsx
└── main.jsx

public/
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── maskable-icon.png
└── ...

PWA configuration
├── manifest
└── service worker
```

Adapt this to the existing project rather than forcing a restructuring.

---

# Final Principle

Build the application as if real citizens will depend on it.

Every feature should be:

```text
Clear
Accessible
Responsive
Secure
Fast
Reliable
Installable
Maintainable
```

Make the smallest correct change necessary.

Do not over-engineer.

Do not break working functionality.

Do not invent official information.

Do not sacrifice accessibility, security, or usability for visual design.
