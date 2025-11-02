import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture } from "../../../redux/slices/profileSlice";
// import { setProfilePicture } from "../store/slices/profileSlice"; // adjust path

export default function ProfilePictureUpload() {
  const dispatch = useDispatch();
  const profilePictureUrl = useSelector(
    (state) => state.profile.profilePictureUrl
  );
  //   console.log("profle", profilePictureUrl);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      dispatch(setProfilePicture(uri));
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need camera permissions to take photos!"
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      dispatch(setProfilePicture(uri));
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Upload Profile Picture",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className=" mt-[2.36%]">
      <View className="flex-row">
        <Text className="font-poppins-500medium text-base text-[#060605]">
          Profile Picture
        </Text>
      </View>

      {/* Image Preview */}
      {profilePictureUrl && (
        <View className="mt-[2%] items-center">
          <Image
            source={{ uri: profilePictureUrl }}
            className="w-32 h-32 rounded-full"
          />
        </View>
      )}

      {/* Choose File Button */}
      <TouchableOpacity
        onPress={showImagePickerOptions}
        className="border mt-[1.8%] justify-center bg-white  border-gray-200  rounded-md px-[8%] py-[3%] flex-row items-center"
      >
        <Ionicons name="image-outline" size={20} color="#9CA3AF" />
        <Text className="font-poppins-400regular text-base text-[#898989] ml-[2%]">
          Choose Your File
        </Text>
      </TouchableOpacity>
    </View>
  );
}
