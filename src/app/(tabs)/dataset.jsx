import { View, Text, ScrollView } from "react-native";
import React from "react";
import DatasetUpload from "../components/tabs/dataset/RawImageUpload";
import TrainingDataUpload from "../components/tabs/dataset/TrainingDataUpload";
import { verticalScale } from "../util/Adaptiveness";
import TestingDataUplaod from "../components/tabs/dataset/TestingData";

export default function Dataset() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(80) }}
      >
        <DatasetUpload />
        <TrainingDataUpload />
        <TestingDataUplaod />
      </ScrollView>
    </View>
  );
}
