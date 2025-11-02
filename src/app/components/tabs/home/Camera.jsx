import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "../../../util/Adaptiveness";
import { router } from "expo-router";

export default function Camera() {
  return (
    <Pressable
      style={{ width: "100%", borderRadius: scale(20) }}
      className="bg-gray-100 mt-[3%]"
      onPress={() => router.push("/home/cameraView")}
    >
      <LinearGradient
        colors={["#9333ea", "#6b21a8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: verticalScale(78), borderRadius: scale(12) }}
        className=" justify-center items-center shadow-lg"
      >
        {/* Completed Status */}
        <View className="flex-row justify-center items-center">
          <View
            style={{
              backgroundColor: "rgba(37, 99, 235, 0.9)",
              width: scale(50),
              height: verticalScale(50),
            }}
            className=" justify-center items-center rounded-full  mr-[3%]"
          >
            <Ionicons name="camera" size={24} color="white" />
          </View>
          <View className="flex-col gap-y-[3%]">
            <Text className="text-white font-poppinsMedium text-base">
              Start Inspection
            </Text>
            <Text className="font-poppins text-xs text-gray-100">
              Capture PCB for analysis
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
