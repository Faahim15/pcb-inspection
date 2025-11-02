import { View, Text } from "react-native";
import Recentangle from "./Rectangle";

export default function () {
  return (
    <View>
      <Text className="font-poppins-bold  my-[3%] text-base text-black">
        Quick Actions
      </Text>
      <View className="flex-row justify-center items-center flex-wrap gap-x-[4%] gap-y-[4%] ">
        <Recentangle
          rectangleConfig={{
            title: "Recent Results",
            subtitle: "view past inspections",
            icon: "refresh-outline",
            iconColor: "#10B981",
            iconBgColor: "#D1FAE5",
            borderColor: "#A7F3D0",
          }}
        />
        <Recentangle
          rectangleConfig={{
            icon: "server-outline",
            iconColor: "#8B5CF6",
            iconBgColor: "#EDE9FE",
            borderColor: "#DDD6FE",
            title: "Datasets",
            subtitle: "Manage training data",
          }}
        />
        <Recentangle
          rectangleConfig={{
            icon: "analytics-outline",
            iconColor: "#F59E0B",
            iconBgColor: "#FEF3C7",
            borderColor: "#FDE68A",
            title: "Analytics",
            subtitle: "Performance insights",
          }}
        />
        <Recentangle
          rectangleConfig={{
            icon: "settings-outline",
            iconColor: "#3B82F6",
            iconBgColor: "#DBEAFE",
            borderColor: "#BFDBFE",
            title: "Settings",
            subtitle: "App preferences",
          }}
        />
      </View>
    </View>
  );
}
