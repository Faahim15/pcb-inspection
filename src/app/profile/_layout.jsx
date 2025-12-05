import { Stack } from "expo-router";
import { stackScreenOptions } from "../components/shared/navigation/NavigationStyles";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="editProfile"
        options={{ title: "Edit Profile", ...stackScreenOptions }}
      />
      <Stack.Screen
        name="notification"
        options={{ title: "Notification", ...stackScreenOptions }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "Settings", ...stackScreenOptions }}
      />
      <Stack.Screen
        name="terms_policy"
        options={{ title: "Terms and Conditions", ...stackScreenOptions }}
      />
      <Stack.Screen
        name="privacy"
        options={{ title: "Privacy", ...stackScreenOptions }}
      />
      <Stack.Screen
        name="about_us"
        options={{ title: "About us", ...stackScreenOptions }}
      />
      <Stack.Screen
        name="changePassword"
        options={{ title: "Change Password", ...stackScreenOptions }}
      />
    </Stack>
  );
}
