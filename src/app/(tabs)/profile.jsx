import { Image, Text, View, ScrollView } from "react-native";
import { scale, verticalScale } from "../util/Adaptiveness";
import { useState } from "react";
import { router } from "expo-router";
import ProfileMenuItem from "../components/tabs/profile/ProfileMenuItem";
import {
  accountSettings,
  editProfile,
  notification,
  support,
} from "../../../assets/svg/profile";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import LogoutItem from "../components/tabs/profile/LogoutItem";

export default function UserProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  function logoutHandler() {
    setModalVisible(true);
  }

  const handleYes = () => {
    router.replace("/onboarding");
  };

  const handleNo = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-[5%] pb-6">
          <View className="pt-4">
            <Text className="font-poppins-semiBold text-center text-lg text-[#1F2937]">
              My Profile
            </Text>
          </View>

          <View className="mt-[2%] items-center justify-center">
            <Image
              source={{
                uri: "https://avatar.iran.liara.run/public/boy",
              }}
              style={{ width: scale(96), height: verticalScale(96) }}
              className="rounded-full border-2 border-white"
              resizeMode="cover"
            />
            <Text className="font-poppins-semiBold text-lg text-[#565656] mt-2">
              Jahid
            </Text>
          </View>

          <View className="mt-[3%]">
            <ProfileMenuItem
              iconName={editProfile}
              label="Edit Profile"
              onPress={() => router.push("/profile/editProfile")}
            />
            <ProfileMenuItem
              iconName={notification}
              label="Notification"
              onPress={() => router.push("/profile/notification")}
            />
            <ProfileMenuItem
              iconName={accountSettings}
              onPress={() => router.push("/profile/settings")}
              label="Account Settings"
            />

            <LogoutItem onPress={logoutHandler} />

            <ConfirmationModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              title="Do you want to log out?"
              yesText={"Yes"}
              noText="No"
              onYes={handleYes}
              onNo={handleNo}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
