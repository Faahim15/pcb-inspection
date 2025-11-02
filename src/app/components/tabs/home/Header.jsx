import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "../../../util/Adaptiveness";
import { useSelector } from "react-redux";
export default function Header() {
  const profilePictureUrl = useSelector(
    (state) => state.profile.profilePictureUrl
  );
  return (
    <View
      style={{ width: "100%", height: verticalScale(66) }}
      className="border-b py-[3%] border-b-slate-300 bg-white"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-[4%]">
          <View
            style={{ width: scale(46), height: verticalScale(46) }}
            className="bg-purple-600 rounded-md border border-purple-600 justify-center items-center "
          >
            <Ionicons name="hardware-chip-outline" size={28} color="#fff" />
          </View>
          <Text className="font-poppins-bold text-base text-black ">
            Pcb inspector
          </Text>
        </View>

        {/* profile picture and notification */}

        <View className="flex-row  items-center">
          <Ionicons name="notifications" size={24} color="#111" />
          <Image
            style={{
              width: scale(43),
              height: verticalScale(43),
              borderRadius: scale(22),
              marginLeft: scale(12),
            }}
            source={{ uri: profilePictureUrl || "https://i.pravatar.cc/300" }}
          />
        </View>
      </View>
    </View>
  );
}
