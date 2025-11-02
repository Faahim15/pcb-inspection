import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../components/auth/InputField";
import PasswordField from "../components/auth/PasswordField";
import { router } from "expo-router";
import Button from "../components/auth/Button";
import Checkbox from "../components/auth/Checkbox";
import { useSelector } from "react-redux";
import { scale, verticalScale } from "../util/Adaptiveness";

export default function LoginScreen() {
  const profilePictureUrl = useSelector(
    (state) => state.profile.profilePictureUrl
  );
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View className="bg-purple-600 pt-[15%] pb-[8%] px-[6%] items-center">
          <View
            style={{
              height: verticalScale(80),
              width: scale(80),
              // borderRadius: scale(25),
            }}
            className=" rounded-full bg-purple-600  mb-[6%]"
          >
            <Image
              style={{
                height: verticalScale(80),
                width: scale(80),
                borderRadius: scale(40),
              }}
              source={{ uri: profilePictureUrl || "https://i.pravatar.cc/300" }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-white text-2xl font-poppins-bold mb-[2%]">
            Welcome Back
          </Text>

          <Text className="text-white/90 font-poppins-400regular text-base">
            Sign in to your account
          </Text>
        </View>

        {/* Form Section */}
        <View className="flex-1 px-[6%] pt-[8%]">
          {/* Email Input */}

          <View className="mb-[3%]">
            <InputField
              inputConfig={{
                label: "Email Address",
                placeholder: "john@example.com",
                keyboardType: "email-address",
                autoCapitalize: "none",
                icon: "mail-outline",
              }}
            />
          </View>

          {/* Password Input */}
          <PasswordField />

          <View className="mt-[3%]">
            <Checkbox text="Remember me" />
          </View>

          {/* Sign In Button */}
          <View className="mt-[3%]">
            <Button onPress={() => router.replace("/home")} title="Sign In" />
          </View>

          {/* Divider */}
          <View className="flex-row mt-[3%] items-center mb-[0%]">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-[4%] text-gray-500 font-poppins-400regular text-sm">
              or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity className="flex-row mt-[3%] items-center justify-center border border-gray-200 rounded-lg h-[12%] min-h-[50px] mb-[0%]">
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text className="ml-[3%] font-poppins-semiBold text-gray-700 text-base font-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Create Account Link */}
          <View className="flex-row justify-center mt-[2%] mb-[3%]">
            <Text className="text-gray-600 font-poppins-400regular text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signUp")}>
              <Text className="text-purple-600 text-sm font-poppins-500medium ">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Links */}
          <View className="flex-row justify-center items-center mb-[4%]">
            <TouchableOpacity className="mr-[6%]">
              <Text className="text-gray-500 font-poppins-400regular text-xs">
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-gray-500 font-poppins-400regular text-xs">
                Terms of Service
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center font-poppins-400regular text-gray-400 text-xs mb-[4%]">
            © 2025 SecureApp. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
