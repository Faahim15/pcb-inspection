import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Checkbox({ text }) {
  const [checked, setChecked] = useState(false);
  return (
    <View className="flex-row justify-between">
      <View className="flex-row">
        <Pressable onPress={() => setChecked(!checked)}>
          <Ionicons
            name={checked ? "checkbox" : "square-outline"}
            size={16}
            color="#9333ea"
            className=" bg-white"
          />
        </Pressable>
        <Text className="ml-[2.13%] font-poppins-500medium text-sm text-[#475467]">
          {text}
        </Text>
      </View>
      <Pressable onPress={() => router.push("/auth/forgetPassword")}>
        <Text className="font-poppins-semiBold text-sm text-purple-600 ">
          Forget Password?
        </Text>
      </Pressable>
    </View>
  );
}
