import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthButton({ onPress, title, agreeToTerms = false }) {
  const [loading, setLoading] = useState(false);

  const handleAuthPress = () => {
    setLoading(true); // Show spinner

    setTimeout(() => {
      setLoading(false); // Hide spinner after 1 second
      // console.log("Auth action completed");

      // Trigger parent action
      if (onPress) {
        onPress();
      }
    }, 1000);
  };

  return (
    <TouchableOpacity
      onPress={handleAuthPress}
      activeOpacity={0.7}
      disabled={!agreeToTerms || loading}
      className={`w-full h-[56px] rounded-lg items-center justify-center flex-row ${
        agreeToTerms ? "bg-purple-600" : "bg-purple-500 opacity-50"
      }`}
    >
      <Text className="text-white font-poppinsMedium text-base mr-[2%]">
        {title}
      </Text>

      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Ionicons name="arrow-forward" size={20} color="white" />
      )}
    </TouchableOpacity>
  );
}
