import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import inspectionData from "../../data/InspectionData";

const RecentInspections = () => {
  const renderInspectionItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={{ borderColor: item.status === "Failed" ? "#fecaca" : "#bbf7d0" }}
      className="bg-white rounded-xl mb-[3%] p-[2%] shadow-sm border-2"
    >
      <View className="flex-row items-center justify-between">
        {/* Left side with icon and details */}
        <View className="flex-row items-center flex-1">
          {/* Circuit board icon */}
          <View className="w-[48px] h-[48px] bg-gray-100 rounded-lg items-center justify-center mr-[4%]">
            <Ionicons name="hardware-chip-outline" size={24} color="#6B7280" />
          </View>

          {/* Inspection details */}
          <View className="flex-1">
            <Text className="text-gray-900 font-poppins-semiBold text-base mb-1">
              {item.code}
            </Text>
            <Text className="text-gray-500 font-poppins-400regular text-xs">
              {item.defects} • {item.time}
            </Text>
          </View>
        </View>

        {/* Right side with status and arrow */}
        <View className="flex-row justify-end items-center">
          {/* Status badge */}
          <View
            className={`${item.statusColor} px-[3%] py-[1.5%] rounded-lg mr-[3%]`}
          >
            <Text
              className={`${item.statusTextColor} text-xs font-poppins-500medium`}
            >
              {item.status}
            </Text>
          </View>

          {/* Arrow icon */}
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-[2%]">
        <Text className="text-black font-poppins-bold text-base">
          Recent Inspections
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-poppins-500medium text-base">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {inspectionData.slice(0, 4).map(renderInspectionItem)}
    </View>
  );
};

export default RecentInspections;
