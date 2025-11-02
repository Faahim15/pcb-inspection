import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
export default function ConfirmPassword({ label = "Confirm Password" }) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <View className="">
      <Text className="text-gray-900 text-base font-poppinsMedium mb-[2%]">
        {label}
      </Text>
      <View className="relative">
        <View className="absolute left-[4%] top-[18px] z-10">
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
        </View>
        <TextInput
          placeholder="••••••••"
          secureTextEntry={!showConfirmPassword}
          className="w-full h-[56px] bg-white border border-gray-200 rounded-lg pl-[14%] pr-[14%] text-gray-900"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-[4%] top-[18px]"
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
