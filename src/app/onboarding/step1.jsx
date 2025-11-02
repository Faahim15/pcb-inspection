import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import ProgressSlider from "../components/onboarding/ProgressSlider";
import Button from "../components/onboarding/Button";
import { useRouter } from "expo-router";
import Title from "../components/onboarding/Title";

const TalentPassionScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 ">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        }}
        className="flex-1"
        resizeMode="cover"
      >
        <Title
          headline="Precision Meets Innovation"
          subtext="Leverage the power of artificial intelligence to automatically detect defects in printed circuit boards with unparalleled accuracy, saving time and reducing costs."
        />
        <View className="mb-[20%]  ">
          <ProgressSlider />
          <Button onPress={() => router.push("/onboarding/step2")}>Next</Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TalentPassionScreen;
