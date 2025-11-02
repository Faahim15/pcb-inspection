import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useColorScheme } from "react-native";

function Layout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? "#000" : "#fff"}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default Layout;
