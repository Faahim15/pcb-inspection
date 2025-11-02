import { View, Text } from "react-native";

export default function Title({ headline, subtext }) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-poppins-500medium text-3xl text-center text-white">
        {headline}
      </Text>
      <View className="mx-[3%] mt-[2%]">
        <Text className="font-poppins-400regular text-base text-gray-200 text-center">
          {subtext}
        </Text>
      </View>
    </View>
  );
}
