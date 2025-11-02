import { useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Button({ onPress, title }) {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (onPress) {
        onPress();
      }
    }, 1000);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={loading}
      className={`w-full bg-purple-600 h-[56px] rounded-lg items-center justify-center flex-row ${
        loading ? "opacity-70" : ""
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
