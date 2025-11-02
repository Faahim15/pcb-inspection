import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import buttonStyles from "../../util/styles";
export default function AuthHeader({
  title = "Create Your Account",
  subtitle = "and start trying our services!",
}) {
  const router = useRouter();
  return (
    <View className=" pb-[3%] bg-purple-600 border-b border-[#484847] pt-[2%]">
      <View
        style={buttonStyles}
        className="border  mx-[6%] border-[#fff] justify-center items-center "
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </Pressable>
      </View>
      <View className="px-[15%] mt-[2.5%]">
        <Text className="font-poppinsMedium text-white text-center text-2xl">
          {title}
        </Text>
        <Text className="font-poppins text-white mt-[1.2%] text-center text-sm">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
