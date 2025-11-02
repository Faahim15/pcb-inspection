import React from "react";
import { View, Text } from "react-native";

const TodaysSummary = () => {
  return (
    <View className=" mb-[10%]  ">
      {/* Header */}
      <Text className="text-base font-poppins-bold text-gray-800 mb-[3%]">
        Today's Summary
      </Text>

      {/* Stats Container */}
      <View className="flex-row px-[3%] py-[4%] rounded-2xl  shadow-sm bg-[#fff] justify-between">
        {/* Inspections */}
        <View className="items-center flex-1">
          <Text className="text-3xl font-poppins-bold text-blue-500 mb-[2%]">
            15
          </Text>
          <Text className="text-sm font-poppins-500medium text-gray-500">
            Inspections
          </Text>
        </View>

        {/* Passed */}
        <View className="items-center flex-1">
          <Text className="text-3xl font-poppins-bold text-green-500 mb-[2%]">
            12
          </Text>
          <Text className="text-sm font-poppins-500medium text-gray-500">
            Passed
          </Text>
        </View>

        {/* Failed */}
        <View className="items-center flex-1">
          <Text className="text-3xl font-poppins-bold text-red-500 mb-[2%]">
            3
          </Text>
          <Text className="text-sm font-poppins-500medium text-gray-500">
            Failed
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TodaysSummary;
