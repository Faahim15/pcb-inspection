import React, { useRef } from "react";
import { View, Text, TextInput } from "react-native";

export default function OtpInputScreen() {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View className="px-[6%] mt-[2.36%] ">
      <Text className="text-black text-base font-poppinsMedium mb-[2%] ">
        Enter Code
      </Text>

      {/* OTP Boxes */}
      <View className="flex-row mt-[0%] justify-between w-full">
        {[0, 1, 2, 3, 4, 5].map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            className="w-[12.82%] font-poppinsSemiBold h-auto border border-black rounded-xl text-center text-base"
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
    </View>
  );
}
