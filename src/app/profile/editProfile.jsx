import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import InputField from "../components/auth/InputField";
import ProfilePictureUpload from "../components/auth/ProfiePicture";
import PasswordField from "../components/auth/PasswordField";
import ConfirmPassword from "../components/auth/ConfirmPassword";
import AuthButton from "../components/auth/AuthButton";

export default function EditProfileScreen() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        className="px-[6%]"
      >
        {/* Header */}
        <View className="items-center mt-[2%] mb-[8%]">
          <View className="w-[60px] h-[60px] bg-purple-600 rounded-2xl items-center justify-center mb-[4%]">
            <Ionicons name="rocket" size={28} color="white" />
          </View>
          <Text className="text-2xl font-poppins-bold text-gray-900 mb-[2%]">
            Create Account
          </Text>
          <Text className="text-gray-600 font-poppins-400regular text-sm text-center">
            Join thousands of users and start your journey
          </Text>
        </View>

        <View className="flex-1 justify-center py-[8%]">
          {/* Form Fields */}
          <View className="gap-[2%]">
            {/* Email Address */}
            <View className="mt-[10%]">
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

            <ProfilePictureUpload />

            {/* Password */}
            <PasswordField />

            {/* Confirm Password */}
            <ConfirmPassword />
            {/* Organization Name */}

            <InputField
              inputConfig={{
                label: "Organization Name",
                placeholder: "Your Company",
                keyboardType: "default",
                autoCapitalize: "words",
                icon: "business-outline",
              }}
            />

            {/* Terms and Conditions */}
            <View className="flex-row items-center mt-[1%]">
              <Pressable
                className="mr-[2%] mt-[2px]"
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <Ionicons
                  name={agreeToTerms ? "checkbox" : "square-outline"}
                  size={18}
                  color="#9333ea"
                  className=" bg-white"
                />
              </Pressable>
              {/* <Checkbox text="" /> */}
              <Text className="font-poppins-400regular text-sm text-gray-600 flex-1 leading-5">
                I agree to the{" "}
                <Text className="font-poppins-400regular text-xs text-purple-600">
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text className="font-poppins-400regular text-xs text-purple-600">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Create Account Button */}
            <AuthButton
              title="Update Account"
              onPress={() => router.push("/auth/signIn")}
              agreeToTerms={agreeToTerms}
            />

            {/* Divider */}
            <View className="items-center ">
              <Text className="text-gray-500 font-poppins-400regular text-sm ">
                Or continue with
              </Text>
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row gap-[2%]">
              <TouchableOpacity className="flex-1 h-[56px] bg-white border border-gray-200 rounded-lg items-center justify-center flex-row">
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text className="text-gray-700 font-medium ml-[2%]">
                  Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View className="flex-row items-center justify-center mb-[2%]">
              <Text className="text-gray-600 font-poppins-400regular text-sm ">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/auth/signIn")}>
                <Text className="text-purple-600 text-sm font-poppins-500medium">
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
