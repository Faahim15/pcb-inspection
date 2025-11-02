import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
export default function PasswordField({ label = "Password" }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <Text className="text-gray-900 text-base font-poppinsMedium mb-[2%]">
        {label}
      </Text>
      <View className="relative">
        <View className="absolute left-[4%] top-[18px] z-10">
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
        </View>
        <TextInput
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          className="w-full h-[56px] bg-white border border-gray-200 rounded-lg pl-[14%] pr-[14%] text-gray-900"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-[4%] top-[18px]"
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
