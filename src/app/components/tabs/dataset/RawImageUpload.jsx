import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function DatasetUpload() {
  const [images, setImages] = useState([]);

  const pickImages = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImages([...images, ...result.assets.map((asset) => asset.uri)]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick images");
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const renderImagePlaceholder = (uri, index) => {
    if (uri) {
      return (
        <View className="relative w-[28%] aspect-square bg-gray-100 rounded-lg overflow-hidden mb-[4%]">
          <Image
            source={{ uri }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => removeImage(index)}
            className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="w-[28%] aspect-square bg-gray-100 rounded-lg items-center justify-center mb-[4%]">
        <Ionicons name="image-outline" size={40} color="#9CA3AF" />
      </View>
    );
  };

  const placeholders = [...images];
  while (placeholders.length < 3) {
    placeholders.push(null);
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-[6%] py-[8%]">
        {/* Header */}
        <View className="flex-row items-center mb-[6%]">
          <Ionicons name="albums" size={24} color="#8B5CF6" />
          <Text className="text-xl font-bold text-gray-800 ml-[3%]">
            Dataset Contents
          </Text>
        </View>

        {/* Image Grid */}
        <View className="flex-row flex-wrap justify-between">
          {placeholders.map((uri, index) => (
            <React.Fragment key={index}>
              {renderImagePlaceholder(uri, index)}
            </React.Fragment>
          ))}
        </View>

        {/* Section Title */}
        <View className="mt-[2%]">
          <Text className="text-base font-semibold text-gray-800 mb-[2%]">
            1. Raw Images
          </Text>
          <Text className="text-sm text-gray-500 mb-[6%]">
            These are your original uploads.
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          onPress={pickImages}
          className="bg-purple-600 rounded-lg py-[3.5%] px-[6%] flex-row items-center justify-center self-end"
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-[2%]">
            Upload More
          </Text>
        </TouchableOpacity>

        {/* Images Count */}
        {images.length > 0 && (
          <Text className="text-sm text-gray-600 mt-[4%] text-center">
            {images.length} {images.length === 1 ? "image" : "images"} uploaded
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
