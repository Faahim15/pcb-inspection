import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  const cameraRef = useRef(null);

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center px-[8%]">
        <Text className="text-white text-center mb-[5%]">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-[8%] py-[3%] rounded-lg"
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", photo);

      // Navigate to analysis screen with photo URI
      router.push({
        pathname: "home/analysis",
        params: { photoUri: photo.uri },
      });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected image:", result.assets[0]);

      // Navigate to analysis screen with selected image URI
      router.push({
        pathname: "/home/analysis",
        params: { photoUri: result.assets[0].uri },
      });
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        enableTorch={flash === "on"}
      >
        {/* Top Header */}
        {/* <View className="absolute top-0 left-0 right-0 pt-[12%] px-[4%]">
          <View className="flex-row items-center">
            <View className="bg-red-600 px-[3%] py-[1%] rounded">
              <Text className="text-white text-xs font-bold">LIVE</Text>
            </View>
            <View className="flex-1" />
          </View>
        </View> */}

        {/* Focus Frame Overlay */}
        <View className="absolute top-[30%] left-[10%] right-[10%] bottom-[35%] border-2 border-cyan-400">
          {/* Corner Brackets */}
          <View className="absolute top-[-2px] left-[-2px] w-[15%] h-[8%] border-t-4 border-l-4 border-cyan-400" />
          <View className="absolute top-[-2px] right-[-2px] w-[15%] h-[8%] border-t-4 border-r-4 border-cyan-400" />
          <View className="absolute bottom-[-2px] left-[-2px] w-[15%] h-[8%] border-b-4 border-l-4 border-cyan-400" />
          <View className="absolute bottom-[-2px] right-[-2px] w-[15%] h-[8%] border-b-4 border-r-4 border-cyan-400" />
        </View>

        {/* Bottom Instruction */}
        {/* <View className="absolute bottom-[22%] left-0 right-0 items-center">
          <Text className="text-white text-sm bg-black/50 px-[4%] py-[2%] rounded">
            Tap to capture. Hold for burst mode.
          </Text>
          <Text className="text-white/70 text-xs mt-[1%] bg-black/50 px-[3%] py-[1%] rounded">
            Pinch to zoom. Swipe for settings or analysis.
          </Text>
        </View> */}

        {/* Bottom Controls */}
        <View className="absolute bottom-[6%] left-0 right-0 px-[8%]">
          <View className="flex-row items-center justify-between">
            {/* Gallery Button */}
            <TouchableOpacity
              onPress={pickImage}
              className="w-[15%] aspect-square border-2 border-white rounded-lg items-center justify-center"
            >
              <Ionicons name="images" size={24} color="white" />
            </TouchableOpacity>

            {/* Capture Button */}
            <TouchableOpacity
              onPress={takePicture}
              className="w-[20%] aspect-square rounded-full border-4 border-white items-center justify-center bg-blue-500"
            >
              <Ionicons name="camera" size={32} color="white" />
            </TouchableOpacity>

            {/* Flash Toggle Button */}
            <TouchableOpacity
              onPress={toggleFlash}
              className="w-[15%] aspect-square bg-gray-800/80 rounded-full items-center justify-center"
            >
              <Ionicons
                name={flash === "on" ? "flash" : "flash-off"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
