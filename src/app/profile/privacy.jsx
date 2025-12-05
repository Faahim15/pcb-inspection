import { View, Text, ScrollView } from "react-native";
import React from "react";
import { scale, verticalScale } from "../util/Adaptiveness";
// import { scale, verticalScale } from "../../../util/Adaptiveness";

export default function Privacy() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
      }}
    >
      <Text
        className="font-poppins-600semibold text-2xl mb-4"
        style={{ color: "#175994" }}
      >
        Privacy Policy
      </Text>

      <Text className="font-poppins-400regular text-xs text-gray-500 mb-6">
        Last updated: December 2024
      </Text>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          1. Information We Collect
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          We collect PCB images, detection results, and device information to
          provide infection detection services. No personal health information
          is stored without your consent.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          2. How We Use Your Data
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          Your data is used solely to analyze PCB infections, improve detection
          accuracy, and provide you with results. We do not share your data with
          third parties without explicit permission.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          3. Data Security
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          We employ industry-standard encryption and security measures to
          protect your data. All images and results are stored securely on
          encrypted servers.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          4. Data Retention
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          Detection history is retained for 90 days unless you choose to delete
          it earlier. You can request complete data deletion at any time through
          the app settings.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          5. Your Rights
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          You have the right to access, modify, or delete your data at any time.
          Contact us at support@pcbdetection.com for data-related requests.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          6. Changes to Privacy Policy
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          We may update this policy periodically. Continued use of the app
          constitutes acceptance of any changes. Major changes will be
          communicated via in-app notifications.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          7. Contact Us
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          For privacy concerns or questions, contact us at:{"\n"}
          Email: support@pcbdetection.com{"\n"}
          Address: [Your Company Address]
        </Text>
      </View>

      <View className="bg-blue-50 p-4 rounded-lg mb-6">
        <Text className="font-poppins-500medium text-sm text-gray-800 text-center">
          By using this app, you agree to this Privacy Policy.
        </Text>
      </View>
    </ScrollView>
  );
}
