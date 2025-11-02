import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function InputField({ inputConfig }) {
  return (
    <View className="">
      <Text className="text-gray-900  text-base font-poppins-500medium mb-[2%]">
        {inputConfig.label}
      </Text>
      <View className="relative">
        <View className="absolute left-[4%] top-[18px] z-10">
          <Ionicons name={inputConfig.icon} size={20} color="#9CA3AF" />
        </View>
        <TextInput
          placeholder={inputConfig.placeholder}
          keyboardType={inputConfig.keyboardType}
          autoCapitalize={inputConfig.autoCapitalize}
          placeholderTextColor="#898989"
          className="w-full h-[56px] font-poppins-400regular bg-white border border-gray-200  rounded-lg pl-[14%] pr-[4%] text-gray-900"
        />
      </View>
    </View>
  );
}
export default InputField;
