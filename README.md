# Beid

A project for Frontend Engineer Take-Home Assignment.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Note

- The app implements local authentication (biometric) features. However, Face ID testing is limited as it requires an Apple Developer Account (approximately RM300+) to run on the iOS development client. The basic authentication functionality can still be tested using device passcode or Touch ID where available.

- The authentication status is stored in AsyncStorage for demonstration purposes. In a production environment, sensitive data like authentication tokens should be stored securely using solutions like Expo SecureStore.

- The `onRefresh` function in the app simulates data fetching with a 2-second timeout. In a production environment, this would be replaced with actual API calls to fetch fresh data during pull-to-refresh actions.

## Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in your Supabase credentials in `.env.local`:
   - `EXPO_PUBLIC_SUPABASE_URL`: Your project URL
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your project's anon/public key

These values can be found in the Supabase project settings under API section.

## Supabase Setup

The SQL schema and initial data setup can be found in `/lib/supabase/supabase.sql` and `lib/supabase/supabase.csv`. This file contains all necessary database configurations and seed data.

> **Note:** The current Row Level Security (RLS) configuration allows public access to view all transactions. In a production environment, RLS policies should be properly configured to restrict users to only view transactions associated with their own user ID for enhanced security and data privacy.

## P.S.

While I learned Expo in just 3 days, the transition felt natural due to its similarities with Next.js. The framework's structure and development patterns seems similar and align well with Next.js concepts.
