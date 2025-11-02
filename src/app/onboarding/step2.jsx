import { View, ImageBackground } from "react-native";
import ProgressSlider from "../components/onboarding/ProgressSlider";
import Button from "../components/onboarding/Button";
import { useRouter } from "expo-router";
import Title from "../components/onboarding/Title";

const step2 = () => {
  const router = useRouter();
  return (
    <View className="flex-1 ">
      <ImageBackground
        source={require("../../../assets/onboarding/step2.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <Title
          headline="Intelligent Analysis for Flawless Boards"
          subtext="Our AI learns, adapts, and identifies infections with unparalleled accuracy."
        />
        <View className="mb-[20%]  ">
          <ProgressSlider activeIndex={1} />
          <Button onPress={() => router.push("/onboarding/step3")}>Next</Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default step2;
