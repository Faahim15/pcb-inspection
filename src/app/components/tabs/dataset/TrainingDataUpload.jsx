import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

export default function TrainingDataUpload() {
  const [trainingImages, setTrainingImages] = useState({
    count: 0,
    files: [],
  });
  const [annotations, setAnnotations] = useState({
    count: 0,
    files: [],
  });

  // Method 1: Using expo-image-picker (Recommended for images)
  const pickImagesWithImagePicker = async () => {
    try {
      // Request permissions first
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 0, // 0 means no limit
        quality: 1,
        orderedSelection: true,
      });

      console.log("Image picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImages = result.assets;
        setTrainingImages((prev) => ({
          count: prev.count + newImages.length,
          files: [...prev.files, ...newImages],
        }));
        Alert.alert(
          "Success",
          `Added ${newImages.length} image(s)\nTotal: ${trainingImages.count + newImages.length} files`
        );
      } else {
        console.log("User canceled image selection");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick images");
      console.error("Image picker error:", error);
    }
  };

  // Method 2: Using DocumentPicker for images (alternative)
  const pickImagesWithDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      console.log("Document picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImages = result.assets;
        setTrainingImages((prev) => ({
          count: prev.count + newImages.length,
          files: [...prev.files, ...newImages],
        }));
        Alert.alert(
          "Success",
          `Added ${newImages.length} image(s)\nTotal: ${trainingImages.count + newImages.length} files`
        );
      } else {
        console.log("User canceled document picker");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick images");
      console.error("Document picker error:", error);
    }
  };

  const pickTextFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain",
        multiple: true,
        copyToCacheDirectory: true,
      });

      console.log("Text picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newTextCount = result.assets.length;
        setAnnotations((prev) => ({
          count: prev.count + newTextCount,
          files: [...prev.files, ...result.assets],
        }));
        Alert.alert(
          "Success",
          `Added ${newTextCount} text file(s)\nTotal: ${annotations.count + newTextCount} files`
        );
      } else {
        console.log("User canceled text file picker");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick text files");
      console.error("Text picker error:", error);
    }
  };

  // Clear all selected files
  const clearAllFiles = () => {
    setTrainingImages({ count: 0, files: [] });
    setAnnotations({ count: 0, files: [] });
    Alert.alert("Cleared", "All files have been cleared");
  };

  return (
    <View className="flex-1 bg-gray-50 px-[4%] py-[6%]">
      <View className="bg-white rounded-2xl p-[5%] shadow-sm">
        {/* Header */}
        <Text className="text-lg font-semibold text-gray-800 mb-[5%]">
          1. Training Data
        </Text>

        {/* Content Container */}
        <View className="flex-row justify-between mb-[4%]">
          {/* Training Images Section */}
          <View className="w-[48%]">
            <View className="items-center mb-[3%]">
              <Ionicons name="folder" size={48} color="#9CA3AF" />
              <Text className="text-gray-600 font-medium mt-[2%]">
                Training Images
              </Text>
              <Text className="text-gray-500 text-sm">(Folder)</Text>
              <Text className="text-gray-700 font-semibold mt-[1%]">
                {trainingImages.count} files
              </Text>
            </View>

            {/* Primary image picker button */}
            <TouchableOpacity
              className="bg-indigo-600 rounded-lg py-[3%] items-center mb-2"
              onPress={pickImagesWithImagePicker}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">+ Add Images</Text>
            </TouchableOpacity>

            {/* Alternative document picker button */}
            <TouchableOpacity
              className="bg-indigo-500 rounded-lg py-[3%] items-center"
              onPress={pickImagesWithDocumentPicker}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-sm">
                + Add Images (Document Picker)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Annotations Section */}
          <View className="w-[48%]">
            <View className="items-center mb-[3%]">
              <Ionicons name="document-text" size={48} color="#9CA3AF" />
              <Text className="text-gray-600 font-medium mt-[2%]">
                Annotations
              </Text>
              <Text className="text-gray-500 text-sm">(Text Files)</Text>
              <Text className="text-gray-700 font-semibold mt-[1%]">
                {annotations.count} files
              </Text>
            </View>

            <TouchableOpacity
              className="bg-indigo-600 rounded-lg py-[3%] items-center"
              onPress={pickTextFiles}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">+ Add Files</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Note */}
        <View className="flex-row items-center mt-[3%]">
          <Ionicons name="add-circle-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-500 text-sm ml-[2%]">
            Paired by file name
          </Text>
        </View>

        {/* Selected Files Preview */}
        {(trainingImages.files.length > 0 || annotations.files.length > 0) && (
          <View className="mt-[4%]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700 font-semibold">
                Selected Files:
              </Text>
              <TouchableOpacity onPress={clearAllFiles}>
                <Text className="text-red-500 text-sm">Clear All</Text>
              </TouchableOpacity>
            </View>

            <View className="max-h-32 overflow-scroll">
              {trainingImages.files.map((file, index) => (
                <View key={index} className="flex-row items-center py-1">
                  <Ionicons name="image" size={16} color="#4F46E5" />
                  <Text
                    className="text-gray-600 text-sm ml-2 flex-1"
                    numberOfLines={1}
                  >
                    {file.fileName || file.uri.split("/").pop()}
                  </Text>
                </View>
              ))}
              {annotations.files.map((file, index) => (
                <View key={index} className="flex-row items-center py-1">
                  <Ionicons name="document-text" size={16} color="#4F46E5" />
                  <Text
                    className="text-gray-600 text-sm ml-2 flex-1"
                    numberOfLines={1}
                  >
                    {file.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Status Info */}
        {(trainingImages.count > 0 || annotations.count > 0) && (
          <View className="mt-[4%] p-[3%] bg-green-50 rounded-lg border border-green-200">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
              <Text className="text-green-700 font-medium ml-[2%]">
                Files uploaded successfully
              </Text>
            </View>
            {trainingImages.count > 0 && (
              <Text className="text-green-600 text-sm mt-[1%] ml-[6%]">
                • {trainingImages.count} training images
              </Text>
            )}
            {annotations.count > 0 && (
              <Text className="text-green-600 text-sm ml-[6%]">
                • {annotations.count} annotation files
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
