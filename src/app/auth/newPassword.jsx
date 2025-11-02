import { View, Text } from "react-native";
import AuthHeader from "../components/auth/AuthHeader";
import AuthButton from "../components/auth/AuthButton";
import { router } from "expo-router";
import ConfirmPassword from "../components/auth/ConfirmPassword";
import PasswordField from "../components/auth/PasswordField";
import Button from "../components/auth/Button";

export default function newPassword() {
  return (
    <View className="flex-1  bg-white">
      <AuthHeader
        title="Create New Password"
        subtitle="Choose a secure new password to protect your Velin account."
      />
      <View className="mt-[5%] px-[6%]">
        <PasswordField label="New Password" />
        <View className="mt-[3%]">
          <ConfirmPassword />
        </View>
      </View>
      <View className="flex-1 px-[6%] justify-end mb-[20%] ">
        <Button title="Save" onPress={() => router.replace("/auth/signIn")} />
      </View>
    </View>
  );
}
