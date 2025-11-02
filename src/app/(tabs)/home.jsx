import { View, Text, ScrollView } from "react-native";
import Header from "../components/tabs/home/Header";
import PCBWelcomeCard from "../components/tabs/home/PcbWelcomeCard";
import Camera from "../components/tabs/home/Camera";
import Summary from "../components/tabs/home/Summary";
import { verticalScale } from "../util/Adaptiveness";
import RecentInspections from "../components/tabs/home/RecentInpections";
import TodaysSummary from "../components/tabs/home/TodaysData";

export default function home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: verticalScale(20) }}
    >
      <View className="bg-white px-[5%]">
        <Header />
        <PCBWelcomeCard />
        <Camera />
        <Summary />
        <RecentInspections />
        <TodaysSummary />
      </View>
    </ScrollView>
  );
}
