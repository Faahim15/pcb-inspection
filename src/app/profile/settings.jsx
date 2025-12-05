import { View } from "react-native";
import AccountOptionItem from "../components/tabs/profile/AccountOptionItem";
import { router } from "expo-router";

export default function Settings() {
  return (
    <View className="flex-1 px-[6%] bg-[#F9F9F9]">
      <AccountOptionItem
        onPress={() => router.push("/profile/changePassword")}
        title="Change Password"
      />
      <AccountOptionItem
        onPress={() => router.push("/profile/terms_policy")}
        title="Terms of Services"
      />
      <AccountOptionItem
        onPress={() => router.push("/profile/privacy")}
        title="Privacy Policy"
      />
      <AccountOptionItem
        onPress={() => router.push("/profile/about_us")}
        title="About us"
      />
    </View>
  );
}
