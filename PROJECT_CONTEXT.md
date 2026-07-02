# PROJECT CONTEXT

## Why this product exists

This app exists to replace paper logs, scattered notes, and complex admin tools with a simple digital companion for dairy farmers. The product is meant to support daily farm operations, reduce friction, and surface the most important actions for the day.

## Why important design decisions were made

- The user is a farmer, not an office admin.
- The early morning app launch experience must answer the question: "What should I do today?"
- The UI must be action-first, not statistics-first.
- Minimal reading and clear icon-led cards reduce cognitive load.
- Mobile-first design is essential because farm users will access the app on phones in the field.

## Why the architecture was chosen

- Next.js App Router provides fast route-based composition and a modern React architecture.
- Firebase Auth and Firestore enable quick backend setup without building a separate server.
- Tailwind CSS keeps the UI system lightweight and easy to iterate.
- Modular service files separate Firestore logic from UI and make the app easier to extend.

## What should never change

- Farmer-first UX philosophy
- Mobile-first layout and touch-friendly interactions
- Workflow-first dashboard ordering (next tasks first)
- Simple, purposeful cards with one decision or action each
- Avoidance of generic admin dashboard patterns

## Farmer-first UX philosophy

The farmer’s day begins with a few core actions. Every screen should answer:
- What do I need to do now?
- What requires my decision?
- Which next action will move the farm forward?

UI should feel like a daily assistant, not a spreadsheet.

## Mobile-first philosophy

Screens should be designed for vertical scrolling, large tappable cards, and fast access from a thumb. The app should feel like a mobile home screen or messaging app, not a desktop dashboard.

Key mobile-first principles:
- stacked single purpose cards
- clear icon anchors
- compact copy
- bottom navigation for main scopes
- no large tables or dense grids on primary screens
