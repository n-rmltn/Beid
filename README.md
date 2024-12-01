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

## P.S.

While I learned Expo in just 3 days, the transition felt natural due to its similarities with Next.js. The framework's structure and development patterns seems similar and align well with Next.js concepts.
