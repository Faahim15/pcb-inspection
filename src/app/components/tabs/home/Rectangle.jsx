import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "../../../util/Adaptiveness";

const Recentangle = ({ rectangleConfig }) => {
  const { title, subtitle, icon, iconColor, iconBgColor, borderColor } =
    rectangleConfig;
  // console.log(title, "read");
  return (
    <View
      style={{
        width: scale(160),
        height: verticalScale(96),
        borderColor: borderColor,
      }}
      className="border-2 border-slate-200  rounded-xl justify-center items-center"
    >
      {/* Refresh icon container */}
      <TouchableOpacity
        onPress={() => {}}
        className=" rounded-md justify-center items-center my-[3%]"
        style={{
          width: scale(36),
          height: verticalScale(36),
          backgroundColor: iconBgColor,
        }}
        activeOpacity={0.7}
      >
        <Ionicons name={icon} size={24} color={iconColor} />
      </TouchableOpacity>

      {/* Recent Results text */}
      <Text className=" font-poppins text-sm text-gray-800 ">{title}</Text>

      {/* Subtitle text */}
      <Text className="font-poppins text-xs py-[1%] text-gray-600 ">
        {subtitle}
      </Text>
    </View>
  );
};

export default Recentangle;
