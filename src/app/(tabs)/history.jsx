import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import repos from "../components/data/historyData";
const PCRRepoList = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filters = ["All", "Library", "Tiny Hearts", "This Month"];

  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-white mx-[4%] mb-[3%] rounded-xl p-[4%] shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1">
          <View
            className={`${item.iconBg} w-[12%] aspect-square rounded-lg items-center justify-center mr-[3%]`}
          >
            <Ionicons name={item.icon} size={20} color="white" />
          </View>

          <View className="flex-1">
            <Text className="text-base font-poppins-semiBold text-gray-900 mb-[1%]">
              {item.name}
            </Text>
            <Text className="text-xs font-poppins-400regular text-gray-500 mb-[2%]">
              {item.author}
            </Text>

            <View className="flex-row items-center mb-[2%]">
              <Text className="text-xs font-poppins-400regular text-gray-600 mr-[3%]">
                Revision
              </Text>
              <Text className="text-xs text-gray-900 font-poppins-500medium ">
                {item.revision}
              </Text>
            </View>

            <View className="flex-row items-center mb-[3%]">
              <Text className="text-xs font-poppins-400regular text-gray-600 mr-[3%]">
                Status
              </Text>
              <Text
                className={`text-xs font-poppins-500medium ${item.status === "Passed" ? "text-emerald-600" : "text-orange-600"}`}
              >
                {item.commits} {item.status}
              </Text>
            </View>

            <View className="flex-row flex-wrap">
              {item.tags.map((tag, index) => (
                <View
                  key={index}
                  className={`${index === 0 ? "bg-blue-100" : "bg-gray-100"} px-[3%] py-[1%] rounded mr-[2%] mb-[1%]`}
                >
                  <Text
                    className={`${index === 0 ? "text-blue-600" : "text-gray-600"} text-xs font-poppins-500medium`}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="items-end ml-[2%]">
          <Text className="text-xs font-poppins-400regular text-gray-400 mb-[2%]">
            {item.time}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-[12%] pb-[4%] px-[4%] border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-[4%]">
          <Text className="text-2xl font-poppins-bold text-gray-900">
            Filters
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-500 text-sm font-poppins-500medium ">
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-[4%]"
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedFilter(filter)}
              className={`${
                selectedFilter === filter ? "bg-purple-600" : "bg-gray-100"
              } px-[5%] py-[2%] rounded-full mr-[2%]`}
            >
              <Text
                className={`${
                  selectedFilter === filter ? "text-white" : "text-gray-700"
                } text-sm font-poppins-500medium`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-[4%]"
        >
          <TouchableOpacity className="bg-gray-100 px-[4%] py-[2%] rounded-full mr-[2%] flex-row items-center">
            <Text className="text-gray-700 text-sm font-poppins-500medium mr-[2%]">
              All Status
            </Text>
            <Ionicons name="chevron-down" size={14} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-emerald-100 px-[4%] py-[2%] rounded-full mr-[2%]">
            <Text className="text-emerald-600 text-sm font-poppins-500medium">
              Passed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-100 px-[4%] py-[2%] rounded-full mr-[2%]">
            <Text className="text-red-600 text-sm font-poppins-500medium">
              Failed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-orange-100 px-[4%] py-[2%] rounded-full">
            <Text className="text-orange-600 text-sm font-poppins-500medium">
              Warning
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Search Bar */}
        <View className="bg-gray-100 rounded-lg px-[4%] py-[3%] flex-row items-center">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-[2%] font-poppins-400regular text-sm text-gray-900"
            placeholder="Search by PCR type or ID"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={repos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PCRRepoList;
