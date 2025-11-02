import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import ProgressSlider from "../components/onboarding/ProgressSlider";
import Button from "../components/onboarding/Button";
import { Link, useRouter } from "expo-router";
import Title from "../components/onboarding/Title";

const step2 = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 ">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80",
        }}
        className="flex-1"
        resizeMode="cover"
      >
        <Title
          headline=" Instant AI-Powered Analysis"
          subtext="Simply upload an image of your PCB. Our advanced algorithm scans it in seconds, identifying faults like shorts, opens, and missing components"
        />
        <View className="mb-[20%]  ">
          <ProgressSlider activeIndex={1} />
          <Button onPress={() => router.push("/onboarding/step3")}>Next</Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default step2;
