import { View, Text } from "react-native";
import AuthHeader from "../components/auth/AuthHeader";
import InputField from "../components/auth/InputField";
import AuthButton from "../components/auth/AuthButton";
import { useRouter } from "expo-router";
import Button from "../components/auth/Button";

export default function ForgetPassword() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white mb-[20%] ">
      <AuthHeader
        title="Forgot Your Password"
        subtitle="Enter the email linked to your account to receive reset instructions."
      />
      <View className="flex-1 px-[6%] mt-[5.1%]">
        <InputField
          inputConfig={{
            label: "Email Address",
            placeholder: "john@example.com",
            keyboardType: "email-address",
            autoCapitalize: "none",
            icon: "mail-outline",
          }}
        />
      </View>
      <View className="flex-1 mx-[6%] justify-end">
        <Button
          onPress={() => router.replace("/auth/verification")}
          title="send"
        />
      </View>
    </View>
  );
}
