import { View, Text, ScrollView } from "react-native";
import React from "react";
import { scale, verticalScale } from "../util/Adaptiveness";

export default function TermsPolicy() {
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
        Terms and Conditions
      </Text>

      <Text className="font-poppins-400regular text-xs text-gray-500 mb-6">
        Last updated: December 2024
      </Text>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          1. Acceptance of Terms
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          By accessing and using this PCB Infection Detection app, you accept
          and agree to be bound by these Terms and Conditions. If you do not
          agree, please discontinue use immediately.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          2. Service Description
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          This app provides AI-powered PCB infection detection services for
          educational and diagnostic purposes. Results are generated through
          machine learning algorithms and should be verified by qualified
          professionals.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          3. User Responsibilities
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          You agree to:{"\n"}• Provide accurate information and images{"\n"}•
          Use the app for lawful purposes only{"\n"}• Not attempt to reverse
          engineer or hack the system{"\n"}• Maintain the confidentiality of
          your account credentials{"\n"}• Not misuse or abuse the detection
          services
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          4. Disclaimer of Warranties
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          The app is provided "as is" without warranties of any kind. While we
          strive for accuracy, detection results may not be 100% accurate. We do
          not guarantee the app will be error-free or uninterrupted.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          5. Limitation of Liability
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          We are not liable for any damages resulting from the use or inability
          to use this app. Detection results should not be used as the sole
          basis for critical decisions without professional verification.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          6. Intellectual Property
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          All content, algorithms, designs, and features of this app are
          protected by intellectual property laws. You may not copy, modify, or
          distribute any part of the app without permission.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          7. Account Termination
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          We reserve the right to suspend or terminate accounts that violate
          these terms, engage in fraudulent activity, or misuse the service.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          8. Data Usage
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          Images and data you upload may be used to improve detection
          algorithms. All data handling is governed by our Privacy Policy. You
          retain ownership of your uploaded content.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          9. Updates and Modifications
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          We may update these terms at any time. Continued use after changes
          constitutes acceptance. We will notify users of significant changes
          through the app.
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          10. Governing Law
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          These terms are governed by the laws of [Your Jurisdiction]. Any
          disputes will be resolved in the courts of [Your Jurisdiction].
        </Text>
      </View>

      <View className="mb-6">
        <Text
          className="font-poppins-600semibold text-base mb-2"
          style={{ color: "#333" }}
        >
          11. Contact Information
        </Text>
        <Text className="font-poppins-400regular text-sm text-gray-700 leading-6">
          For questions about these terms:{"\n"}
          Email: legal@pcbdetection.com{"\n"}
          Support: support@pcbdetection.com{"\n"}
          Address: [Your Company Address]
        </Text>
      </View>

      <View className="bg-orange-50 p-4 rounded-lg mb-6">
        <Text className="font-poppins-500medium text-sm text-gray-800 text-center">
          ⚠️ Important: Detection results are for reference only. Always consult
          qualified professionals for critical decisions.
        </Text>
      </View>

      <View className="bg-blue-50 p-4 rounded-lg mb-6">
        <Text className="font-poppins-500medium text-sm text-gray-800 text-center">
          By using this app, you acknowledge that you have read, understood, and
          agree to these Terms and Conditions.
        </Text>
      </View>
    </ScrollView>
  );
}
