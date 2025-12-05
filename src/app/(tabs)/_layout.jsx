import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  StatusBar,
  Platform,
  Dimensions,
  useColorScheme,
  View,
} from "react-native";
import { scale, verticalScale } from "../util/Adaptiveness";

const { height: screenHeight } = Dimensions.get("window");

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        minHeight: Platform.OS === "android" ? screenHeight : screenHeight - 20,
        paddingBottom: 0,
      }}
    >
      {/* StatusBar setup */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "rgb(59, 7, 100)",
            borderTopWidth: 0,
            borderTopLeftRadius: scale(10),
            borderTopRightRadius: scale(10),
            height: verticalScale(120),
          },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: verticalScale(10),
          },
          tabBarLabelStyle: {
            fontSize: scale(12),
            textAlign: "center",
            marginTop: verticalScale(2),
            fontFamily: "poppins-400regular",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dataset"
          options={{
            title: "Dataset",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="server-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "rgb(59, 7, 100)",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontFamily: "poppins-400regular",
              fontSize: scale(18),
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="refresh-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
