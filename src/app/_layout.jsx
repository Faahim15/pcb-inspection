import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar } from "react-native";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Optional: Status Bar */}
        <StatusBar backgroundColor="#000" barStyle="light-content" />

        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="onboarding" /> */}
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}
