import { View, Text } from "react-native";
import AuthHeader from "../components/auth/AuthHeader";
import OtpInputScreen from "../components/auth/OtpInput";
import { useRouter } from "expo-router";
import Button from "../components/auth/Button";

export default function Verification() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white mb-[20%] ">
      <AuthHeader
        title="Enter Your Verification Code"
        subtitle="We’ve sent a verification code to your email. Enter it here to continue."
      />
      <OtpInputScreen />
      <View className="flex-1 px-[6%] justify-end">
        <Button
          onPress={() => router.replace("/auth/newPassword")}
          title="Submit"
        />
      </View>
    </View>
  );
}
