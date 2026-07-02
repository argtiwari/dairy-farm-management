# AI HANDOVER

## Current project status

The app is in product redesign mode. The landing page is approved and live in `src/app/page.tsx`. The login experience is updated. The dashboard is being reworked into a workflow-first home screen in `src/app/dashboard/page.tsx`.

## Architecture summary

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- Firebase Auth + Firestore backend
- Client-side auth state using `AuthProvider`
- Service layer in `src/lib/` for Firestore operations
- Shared UI primitives in `src/components/ui/`

## Product philosophy

- Farmer-first: surface what the farmer should do next.
- Mobile-first: design for vertical scrolling and thumb reach.
- Action-oriented: every card must help take action or make a decision.
- Simple: avoid generic dashboard metrics and decorative content.

## Completed work

- Basic Next.js app setup and global styling
- Firebase client initialization and env-based configuration
- Auth flow with Firebase email/password and Firestore user profiles
- Landing page product experience
- Login page UX
- Dashboard high-level workflow layout
- Shared UI card component and mobile bottom navigation
- Firestore service modules for cows, expenses, health, milk, medicine, pregnancy, vaccination, workers

## Remaining work

- Connect dashboard to real Firestore data and remove hard-coded snapshot values
- Complete core farm workflows and forms
- Add route protection and auth guards
- Improve consistency across feature screens
- Add better error/loading states and validation
- Introduce farmer-specific task prioritization and decision support

## Important reusable components

- `src/components/ui/app-card.tsx`
- `src/components/auth/login-form.tsx`
- `src/components/auth/auth-actions.tsx`
- `src/components/auth/auth-provider.tsx`
- `src/components/layout/mobile-bottom-nav.tsx`

## Important services

- `src/lib/auth/auth-service.ts`
- `src/lib/auth/user-service.ts`
- `src/lib/cows/cow-service.ts`
- `src/lib/expenses/expense-service.ts`
- `src/lib/health/health-service.ts`
- `src/lib/medicine/medicine-service.ts`
- `src/lib/milk/milk-service.ts`
- `src/lib/pregnancy/pregnancy-service.ts`
- `src/lib/vaccination/vaccination-service.ts`
- `src/lib/workers/worker-service.ts`

## Firestore collections

- `users`
- `cows`
- `expenses`
- `workers`
- `cows/{cowId}/healthRecords`
- `cows/{cowId}/medicineRecords`
- `cows/{cowId}/milkRecords`
- `cows/{cowId}/pregnancyRecords`
- `cows/{cowId}/vaccinationRecords`

## Authentication flow

- `loginWithEmailPassword` signs in via Firebase Auth
- `logout` signs out the user
- `listenToAuthChanges` maps Firebase user to app profile and loads Firestore profile
- `AuthProvider` wraps the app and exposes `user` and `isLoading`
- Auth UI is rendered in `AuthActions` and login form

## Design conventions

- Warm green/cream palette
- Rounded cards and soft shadows
- Icon-first labels with short text
- Compact mobile-friendly card layout
- Minimal decorative content on farmer-facing screens
- Action-first ordering for today’s tasks

## Coding conventions

- TypeScript across app shapes and services
- Firebase access through dedicated Firestore services
- Component-driven route pages in `src/app`
- Tailwind utility classes used directly in components
- `use client` only where hooks or browser behavior are required

## Files changed so far

- `src/app/page.tsx`
- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/auth/login-form.tsx`
- `src/components/ui/app-card.tsx` (shared styling already in place)

## Current roadmap

- Dashboard stabilization and data integration
- Cow and record workflows
- Reminder/expense decision workflow
- Auth guard and role support
- UI polish and production readiness

## Known issues

- Dashboard contains placeholder/static snapshot values
- No full route protection or auth redirects beyond basic login
- Some feature screens still follow older dashboard patterns
- Data flow is not fully connected across services

## Backend constraints

- Firebase/Auth/Firestore backend should not be modified for this handover
- The app relies on environment variables for Firebase config
- Work should stay within front-end and service layer logic

## Files that should not be modified

- `src/lib/firebase/client.ts`
- `src/lib/auth/auth-service.ts`
- `src/lib/auth/user-service.ts`
- Existing Firestore collections and backend rules

## Recommended next phase

Complete the dashboard pipeline by wiring the workflow cards to Firestore data, then build the cow profile and record entry flows to support real farm operations.
