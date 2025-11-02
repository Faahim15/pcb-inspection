import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import ProgressSlider from "../components/onboarding/ProgressSlider";
import Button from "../components/onboarding/Button";
import { useRouter } from "expo-router";
import Title from "../components/onboarding/Title";

const step3 = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 ">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        }}
        className="flex-1"
        resizeMode="cover"
      >
        <Title
          headline="Ensure Flawless Quality"
          subtext="Catch microscopic errors before they become costly failures. Guarantee reliability and protect your brand's reputation."
        />
        <View className="mb-[20%]  ">
          <ProgressSlider activeIndex={2} />
          <Button onPress={() => router.push("/auth/signUp")}>Next</Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default step3;
