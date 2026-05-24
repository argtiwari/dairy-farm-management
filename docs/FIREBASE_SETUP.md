# Firebase Setup

## 1. Create A Firebase Project

- Open Firebase Console.
- Create a new project for the dairy app.
- Add a web app.
- Copy the Firebase web config values.

## 2. Add Local Environment Values

Create `.env.local` from `.env.example`:

```powershell
Copy-Item .env.example .env.local
```

Fill these values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Restart the dev server after editing `.env.local`.

## 3. Enable Firestore

- In Firebase Console, open Firestore Database.
- Create database.
- Start in test mode during local development.
- Choose the nearest region.

Later, before deployment, replace test mode with secure rules.

## 4. Enable Authentication

- In Firebase Console, open Authentication.
- Click Get started.
- Open Sign-in method.
- Enable Email/Password.
- Create your first admin test user from the Users tab.

## 5. Create Your First Admin Role

After logging in once, the app creates a viewer profile at:

```txt
users/{uid}
```

To make your account an admin during development:

- Open Firebase Console.
- Open Authentication > Users.
- Copy your user UID.
- Open Firestore Database.
- Open `users`.
- Open the document with your UID.
- Change `role` from `viewer` to `admin`.

Expected user document shape:

```js
{
  email: "your-email@example.com",
  name: null,
  role: "admin",
  createdAt: "...",
  updatedAt: "..."
}
```

Only trusted project owners should be promoted to `admin`.

## 6. Publish Firestore Rules

This project includes Firestore rules in:

```txt
firestore.rules
```

These rules allow:

- signed-in users to read cows
- admins to create, update, and delete cows
- users to read their own profile
- admins to manage user roles
- admins to run the temporary Firestore connection test

To publish from Firebase Console:

- Open Firestore Database.
- Open Rules.
- Copy the contents of `firestore.rules`.
- Paste into the rules editor.
- Click Publish.

To publish later with Firebase CLI:

```powershell
firebase deploy --only firestore:rules
```

Do not publish rules until your first admin user exists in `users/{uid}`.
