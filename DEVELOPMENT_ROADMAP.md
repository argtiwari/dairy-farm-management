# DEVELOPMENT ROADMAP

## Completed phases

- Project scaffolding with Next.js, TypeScript, and Tailwind CSS
- Firebase setup with Auth and Firestore client initialization
- Core folder structure and service layer created
- Landing page redesign completed and approved
- Login page UX updated for farm-first tone
- Dashboard prototype updated toward workflow-first home screen
- Shared UI primitives and mobile bottom navigation established

## Current implementation

- `src/app/page.tsx` - landing experience with farm-focused product narrative
- `src/app/login/page.tsx` - friendly login experience
- `src/app/dashboard/page.tsx` - workflow-first dashboard layout
- `src/components/auth/` - auth provider, actions, login form
- `src/components/ui/app-card.tsx` - shared card style
- Firebase-backed service modules for auth, users, cows, expenses, health, milk, medicine, pregnancy, vaccination, workers
- `src/app/layout.tsx` wraps the app in `AuthProvider` and mobile navigation

## Remaining phases

1. Connect dashboard tasks and snapshot cards to real Firestore data
2. Build cow profile and record pages with active farm workflows
3. Implement record entry screens for milk, health, medicine, pregnancy, and vaccination
4. Build reminder and expense workflows with decision-oriented alerts
5. Add route protection, auth guards, and viewer/admin role support
6. Polish mobile interactions, loading states, and error handling
7. Add localization, offline support, and farm reports
8. Deploy with secure Firebase rules and production settings

## Priority order

1. Dashboard data integration and task flow stability
2. Cow and farm record workflows
3. Reminder and expense decision flows
4. Authentication roles and access controls
5. UI polish, accessibility, and performance tuning
6. Deployment and production readiness

## Known issues

- Dashboard currently contains placeholder snapshot values and static task content
- Some pages still use legacy admin-style layout patterns
- No formal route protection or auth guard on protected pages
- Some UI logic is client-only and may require server-side data loading later
- Design consistency is still evolving across the app

## Technical debt

- Repeated card layout logic rather than a small suite of shared card variants
- Mock or hard-coded data in the dashboard experience
- Limited validation and error handling in forms
- No centralized state or caching for Firestore queries
- Potential duplication between services and type mappings

## Future improvements

- Fully data-driven dashboard with actual next-task scoring
- Useful notifications and reminder prioritization
- Offline-first sync and local farm data cache
- Clear role management and admin controls
- Multi-language support for Hindi/English
- Farm reporting and export capabilities
