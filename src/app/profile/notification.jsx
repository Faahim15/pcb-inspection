import { View } from "react-native";
import { router } from "expo-router";
import Notification from "../components/tabs/profile/Notification";
import AuthButton from "../components/auth/AuthButton";
export default function NotificationScreen() {
  return (
    <View className="flex-1 px-[6%] bg-[#f9f9f9] ">
      <View className="mt-[5%]">
        <Notification title="General notification" />
        {/* <Notification title="Sound" />
        <Notification title="Vibrate" /> */}
        {/* <Notification title="New Service" /> */}
        <Notification title="Payment" />
      </View>
      <View className="flex-1 px-[1%] mb-[20%] justify-end">
        <AuthButton
          onPress={() => router.back()}
          title="Save"
          agreeToTerms={true}
        />
      </View>
    </View>
  );
}
