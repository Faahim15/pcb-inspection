import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../../../util/Adaptiveness";

const PCBWelcomeCard = () => {
  return (
    <View
      style={{ width: "100%", borderRadius: scale(20) }}
      className="bg-gray-100 mt-[3%] justify-center items-center "
    >
      <LinearGradient
        colors={["#9333ea", "#6b21a8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: scale(12) }}
        className="w-[100%]  p-[6%] shadow-lg"
      >
        {/* Header Text */}
        <Text className="text-white text-xl font-poppins-bold mb-[3%]">
          Welcome back, Sarah!
        </Text>

        {/* Subtitle */}
        <Text className="text-white font-poppins-400regular text-sm opacity-90 mb-[8%] leading-6">
          Ready to inspect your PCBs? Start{"\n"}capturing or review your recent
          results.
        </Text>

        {/* Status Row */}
        <View className="flex-row justify-between items-center">
          {/* Completed Status */}
          <View className="flex-row items-center">
            <View className="bg-green-400 rounded-full p-[2%] mr-[3%]">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-white font-poppins-500medium text-base">
              12 Completed
            </Text>
          </View>

          {/* Pending Status */}
          <View className="flex-row items-center">
            <View className="bg-yellow-400 rounded-full p-[2%] mr-[3%]">
              <Ionicons name="time" size={16} color="white" />
            </View>
            <Text className="text-white font-poppins-500medium text-base">
              3 Pending
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PCBWelcomeCard;
