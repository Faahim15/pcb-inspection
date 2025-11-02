import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";

export default function AnalysisResultScreen() {
  // Get the photo URI from route params
  const { photoUri } = useLocalSearchParams();
  console.log("photoUrsi", photoUri);
  const defects = [
    {
      id: 1,
      type: "Short Circuit (R3)",
      icon: "flash",
      severity: "critical",
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700",
      iconColor: "#dc2626",
    },
    {
      id: 2,
      type: "Open Circuit (C12)",
      icon: "git-compare",
      severity: "warning",
      color: "bg-gray-50 border-gray-200",
      textColor: "text-gray-700",
      iconColor: "#4b5563",
    },
    {
      id: 3,
      type: "Missing Component (U5)",
      icon: "cube-outline",
      severity: "warning",
      color: "bg-gray-50 border-gray-200",
      textColor: "text-gray-700",
      iconColor: "#4b5563",
    },
    {
      id: 4,
      type: "Incorrect Polarity (D7)",
      icon: "add-circle-outline",
      severity: "warning",
      color: "bg-gray-50 border-gray-200",
      textColor: "text-gray-700",
      iconColor: "#4b5563",
    },
  ];

  const handleClose = () => {
    router.back();
  };

  const handleAnalyzeAnother = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      {/* PCB Image with Success Banner */}
      <View className="relative h-[45%] bg-gray-900">
        {/* Display the captured/selected PCB Image */}
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-gray-500 text-base">No Image</Text>
          </View>
        )}

        {/* Success Banner */}
        <View className="absolute top-[8%] left-[4%] right-[4%]">
          <View className="bg-green-500 rounded-lg px-[4%] py-[3%] flex-row items-center">
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text className="text-white font-semibold text-base ml-[3%]">
              Analysis Successful
            </Text>
          </View>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute top-[8%] right-[4%] bg-black/50 rounded-full p-[2.5%]"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Defects List */}
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1">
          {/* Header */}
          <View className="px-[6%] pt-[6%] pb-[4%] border-b border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="flash" size={24} color="#ef4444" />
              <Text className="text-gray-900 font-bold text-lg ml-[3%]">
                Detected Defects ({defects.length})
              </Text>
            </View>
          </View>

          {/* Defects List */}
          <View className="px-[6%] py-[4%]">
            {defects.map((defect) => (
              <TouchableOpacity
                key={defect.id}
                className={`${defect.color} border rounded-xl px-[5%] py-[4%] mb-[3%] flex-row items-center`}
              >
                <View className="mr-[4%]">
                  <Ionicons
                    name={defect.icon}
                    size={24}
                    color={defect.iconColor}
                  />
                </View>
                <Text
                  className={`${defect.textColor} font-medium text-base flex-1`}
                >
                  {defect.type}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="px-[6%] pb-[8%] pt-[4%]">
            <TouchableOpacity className="bg-purple-600 rounded-xl py-[4%] items-center mb-[3%]">
              <Text className="text-white font-poppins-semiBold text-base">
                Export Report
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAnalyzeAnother}
              className="bg-gray-100 rounded-xl py-[4%] items-center border border-gray-300"
            >
              <Text className="text-gray-700 font-poppins-semiBold text-base">
                Analyze Another PCB
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
