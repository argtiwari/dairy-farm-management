# PROJECT OVERVIEW

## Project vision

Build a product-quality dairy farm management app for Indian farmers that feels like a mobile-first assistant rather than a traditional admin dashboard. The experience should be simple, action-oriented, and designed around the daily workflow of a dairy owner or manager.

## Product goal

Create a friendly farm app that helps dairy farmers manage cows, milk records, health events, expenses, reminders, and workers from one easy-to-use interface.

## Target users

- Small and medium dairy farm owners
- Farm managers and supervisors
- Dairy workers who need fast access to core farm tasks
- Users in rural and semi-urban India who need low-friction, mobile-first tools

## Current architecture

- Framework: Next.js 16 with App Router
- UI: React 19 and Tailwind CSS v4
- Icons: lucide-react
- Backend: Firebase
  - Authentication: Firebase Auth
  - Database: Firestore
- App state: client components for auth and page logic

## Folder structure

- `src/app/` - application routes and pages
  - `page.tsx` - landing experience
  - `login/page.tsx` - login experience
  - `dashboard/page.tsx` - workflow-first dashboard home screen
  - feature routes: `cows/`, `expenses/`, `reminders/`, `workers/`, and more
- `src/components/` - reusable UI and domain-specific components
  - `auth/` - auth provider, login form, auth actions
  - `ui/` - shared UI primitives like `AppCard`, buttons, chips
  - `layout/` - mobile bottom nav and shell components
- `src/lib/` - service layer and Firebase integration
  - `firebase/` - Firebase client initialization
  - `auth/` - auth service, user profile service
  - feature services: `cows/`, `expenses/`, `health/`, `medicine/`, `milk/`, `pregnancy/`, `vaccination/`, `workers/`
- `src/types/` - TypeScript domain models and service types

## Routing

- `/` - public landing page / product home
- `/login` - app login page
- `/dashboard` - farmer home screen with next tasks, alerts, snapshot, recent animals, and recent activity
- `/cows` - cow list and profile access
- `/expenses` - expense list and forms
- `/reminders` - reminder and alert list
- `/workers` - worker list and management
- `src/app/cows/new/` - new cow creation
- `src/app/cows/[cowId]/` - individual cow routes

## Firebase

- Firebase is initialized in `src/lib/firebase/client.ts` using environment variables:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
- Firebase app is initialized once using `initializeApp`, then `getAuth` and `getFirestore` are exported.

## Firestore

- Primary collections in use:
  - `users`
  - `cows`
  - `expenses`
  - `workers`
- Nested collections under cow documents:
  - `healthRecords`
  - `medicineRecords`
  - `milkRecords`
  - `pregnancyRecords`
  - `vaccinationRecords`
- Firestore access is handled through service modules in `src/lib/*`.

## Authentication

- Email/password auth using Firebase Auth
- `src/lib/auth/auth-service.ts` provides `loginWithEmailPassword`, `logout`, and `listenToAuthChanges`
- `AuthProvider` in `src/components/auth/auth-provider.tsx` listens for auth state and provides `user` and `isLoading`
- `AuthActions` renders sign-in or sign-out UI depending on auth state
- User profiles are created or fetched from Firestore `users` collection via `createViewerProfileIfMissing` and `getUserProfile`

## Services

Current service modules:
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

Each service is responsible for Firestore CRUD operations and mapping Firestore documents to typed app models.

## Types

Key domain types live under `src/types/`:
- `auth.ts`
- `cow.ts`
- `expense.ts`
- `health.ts`
- `medicine.ts`
- `milk.ts`
- `pregnancy.ts`
- `reminder.ts`
- `vaccination.ts`
- `worker.ts`

These types define DTOs, input shapes, and Firestore result shapes.

## Design system

- Tailwind CSS v4 used across the app
- Shared `AppCard` component provides rounded card layout and hover state
- UI components are lean, icon-led, and emphasize compact touch-friendly cards
- Global palette uses warm greens, creams, and neutral tones
- Mobile-first layout with a persistent bottom navigation (`MobileBottomNav`)

## Current UI direction

- Product-focused, not admin-focused
- Onboarding through a friendly landing page and farm login
- Dashboard is being shaped as a farmer home screen with workflow-first priorities:
  - next tasks first
  - quick actions second
  - alerts and farm snapshot after
  - recent animals and activity below
- Use icons before text and minimize large dashboards or reports until later
