import { View, ImageBackground } from "react-native";
import ProgressSlider from "../components/onboarding/ProgressSlider";
import Button from "../components/onboarding/Button";
import { useRouter } from "expo-router";
import Title from "../components/onboarding/Title";

const TalentPassionScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1 ">
      <ImageBackground
        source={require("../../../assets/onboarding/step1.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <Title
          headline="Precision Diagnostics, Powered by AI"
          subtext="Uncover hidden anomalies and secure your circuits with advanced detection."
        />
        <View className="mb-[20%]  ">
          <ProgressSlider />
          <Button onPress={() => router.push("/onboarding/step2")}>Next</Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default TalentPassionScreen;
