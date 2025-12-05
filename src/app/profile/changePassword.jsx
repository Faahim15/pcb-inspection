import { View, Text } from "react-native";
import PasswordField from "../components/auth/PasswordField";
import ConfirmPassword from "../components/auth/ConfirmPassword";
import Button from "../components/auth/Button";
import { router } from "expo-router";

export default function changePassword() {
  return (
    <View className="flex-1">
      <View className="mt-[5%] px-[6%]">
        <PasswordField label="New Password" />
        <View className="mt-[3%]">
          <ConfirmPassword />
        </View>
      </View>
      <View className="flex-1 px-[6%] justify-end mb-[20%] ">
        <Button title="Save" onPress={() => router.back()} />
      </View>
    </View>
  );
}
