import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  PanResponder,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function PhotoEditor() {
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#FFFFFF");
  const [textElements, setTextElements] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [textSize, setTextSize] = useState(18);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textBgColor, setTextBgColor] = useState("transparent");
  const [textBorderColor, setTextBorderColor] = useState("transparent");
  const [textBorderWidth, setTextBorderWidth] = useState(0);
  const [selectedTextId, setSelectedTextId] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take photos"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addText = () => {
    if (!textInput.trim()) {
      Alert.alert("Error", "Please enter text");
      return;
    }

    const newText = {
      id: Date.now(),
      text: textInput,
      size: textSize,
      color: textColor,
      bgColor: textBgColor,
      borderColor: textBorderColor,
      borderWidth: textBorderWidth,
      x: 0,
      y: 0,
    };

    setTextElements([...textElements, newText]);
    setTextInput("");
  };

  const updateTextPosition = (id, x, y) => {
    setTextElements(
      textElements.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const deleteText = (id) => {
    setTextElements(textElements.filter((el) => el.id !== id));
    setSelectedTextId(null);
  };

  const saveEditedImage = async () => {
    if (!image) {
      Alert.alert("Error", "Please select an image first");
      return;
    }

    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      Alert.alert("Success", "Image saved! URL: " + manipResult.uri);
    } catch (error) {
      Alert.alert("Error", "Failed to save image");
    }
  };

  const colorOptions = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="p-4">
        {/* Header */}
        <Text className="text-white text-2xl font-bold mb-4">Photo Editor</Text>

        {/* Image Preview */}
        {image ? (
          <View className="mb-6 bg-black rounded-lg overflow-hidden border-2 border-gray-700 relative">
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: 300,
                transform: [{ scale: zoom }],
                borderWidth: borderWidth,
                borderColor: borderColor,
              }}
            />
            {/* Render all text elements */}
            {textElements.map((textEl) => (
              <DraggableText
                key={textEl.id}
                textElement={textEl}
                isSelected={selectedTextId === textEl.id}
                onPress={() => setSelectedTextId(textEl.id)}
                onMove={(x, y) => updateTextPosition(textEl.id, x, y)}
              />
            ))}
          </View>
        ) : (
          <View className="mb-6 bg-gray-800 rounded-lg h-64 items-center justify-center border-2 border-dashed border-gray-600">
            <Text className="text-gray-400">No image selected</Text>
          </View>
        )}

        {/* Pick Image and Take Photo Buttons */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={pickImage}
            className="flex-1 bg-blue-600 rounded-lg p-4"
          >
            <Text className="text-white text-center font-bold text-lg">
              🖼️ Pick Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePhoto}
            className="flex-1 bg-purple-600 rounded-lg p-4"
          >
            <Text className="text-white text-center font-bold text-lg">
              📸 Take Photo
            </Text>
          </TouchableOpacity>
        </View>

        {image && (
          <>
            {/* Zoom Control */}
            <View className="mb-6 bg-gray-800 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">Zoom</Text>
                <Text className="text-blue-400">
                  {(zoom * 100).toFixed(0)}%
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">−</Text>
                </TouchableOpacity>
                <View className="flex-1 h-1 bg-gray-700 rounded">
                  <View
                    className="h-full bg-blue-500 rounded"
                    style={{ width: `${(zoom - 0.5) * 200}%` }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Border Control */}
            <View className="mb-6 bg-gray-800 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">Border Width</Text>
                <Text className="text-blue-400">{borderWidth}px</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() => setBorderWidth(Math.max(0, borderWidth - 2))}
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">−</Text>
                </TouchableOpacity>
                <View className="flex-1 h-1 bg-gray-700 rounded">
                  <View
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${borderWidth * 5}%` }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setBorderWidth(Math.min(20, borderWidth + 2))}
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">+</Text>
                </TouchableOpacity>
              </View>

              {/* Border Color */}
              <Text className="text-white font-bold mt-4 mb-2">
                Border Color
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setBorderColor(color)}
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: color,
                      borderWidth: borderColor === color ? 3 : 0,
                      borderColor: "#00BFFF",
                    }}
                  />
                ))}
              </View>
            </View>

            {/* Text Control */}
            <View className="mb-6 bg-gray-800 rounded-lg p-4">
              <Text className="text-white font-bold mb-2">Add Text</Text>
              <TextInput
                value={textInput}
                onChangeText={setTextInput}
                placeholder="Enter text..."
                placeholderTextColor="#999"
                className="bg-gray-700 text-white rounded-lg p-3 mb-4"
                maxLength={50}
              />

              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">Text Size</Text>
                <Text className="text-blue-400">{textSize}px</Text>
              </View>
              <View className="flex-row items-center gap-3 mb-4">
                <TouchableOpacity
                  onPress={() => setTextSize(Math.max(10, textSize - 2))}
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">−</Text>
                </TouchableOpacity>
                <View className="flex-1 h-1 bg-gray-700 rounded">
                  <View
                    className="h-full bg-yellow-500 rounded"
                    style={{ width: `${(textSize / 50) * 100}%` }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setTextSize(Math.min(50, textSize + 2))}
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">+</Text>
                </TouchableOpacity>
              </View>

              {/* Text Color */}
              <Text className="text-white font-bold mb-2">Text Color</Text>
              <View className="flex-row flex-wrap gap-2 mb-4">
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setTextColor(color)}
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: color,
                      borderWidth: textColor === color ? 3 : 0,
                      borderColor: "#00BFFF",
                    }}
                  />
                ))}
              </View>

              {/* Add Text Button */}
              <TouchableOpacity
                onPress={addText}
                className="bg-blue-600 rounded-lg p-3"
              >
                <Text className="text-white text-center font-bold">
                  ➕ Add Text
                </Text>
              </TouchableOpacity>
            </View>

            {/* Text Box Border Control */}
            <View className="mb-6 bg-gray-800 rounded-lg p-4">
              <Text className="text-white font-bold mb-3">Text Box Border</Text>

              {/* Border Width */}
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">Border Width</Text>
                <Text className="text-blue-400">{textBorderWidth}px</Text>
              </View>
              <View className="flex-row items-center gap-3 mb-4">
                <TouchableOpacity
                  onPress={() =>
                    setTextBorderWidth(Math.max(0, textBorderWidth - 1))
                  }
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">−</Text>
                </TouchableOpacity>
                <View className="flex-1 h-1 bg-gray-700 rounded">
                  <View
                    className="h-full bg-purple-500 rounded"
                    style={{ width: `${textBorderWidth * 10}%` }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setTextBorderWidth(Math.min(10, textBorderWidth + 1))
                  }
                  className="bg-gray-700 rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-bold">+</Text>
                </TouchableOpacity>
              </View>

              {/* Border Color */}
              <Text className="text-white font-bold mb-2">Border Color</Text>
              <View className="flex-row flex-wrap gap-2 mb-4">
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setTextBorderColor(color)}
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: color,
                      borderWidth: textBorderColor === color ? 3 : 0,
                      borderColor: "#00BFFF",
                    }}
                  />
                ))}
              </View>

              {/* Background Color */}
              <Text className="text-white font-bold mb-2">
                Background Color
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <TouchableOpacity
                  onPress={() => setTextBgColor("transparent")}
                  className="rounded-lg p-4 bg-gray-600"
                  style={{
                    borderWidth: textBgColor === "transparent" ? 3 : 0,
                    borderColor: "#00BFFF",
                  }}
                >
                  <Text className="text-white font-bold">None</Text>
                </TouchableOpacity>
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setTextBgColor(color)}
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: color,
                      borderWidth: textBgColor === color ? 3 : 0,
                      borderColor: "#00BFFF",
                    }}
                  />
                ))}
              </View>
            </View>

            {/* Display added text list */}
            {textElements.length > 0 && (
              <View className="mb-6 bg-gray-800 rounded-lg p-4">
                <Text className="text-white font-bold mb-3">
                  Text Elements ({textElements.length})
                </Text>
                {textElements.map((textEl) => (
                  <View
                    key={textEl.id}
                    className="flex-row items-center justify-between mb-2 bg-gray-700 rounded-lg p-3"
                  >
                    <View className="flex-1">
                      <Text className="text-white font-bold">
                        {textEl.text}
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        Size: {textEl.size}px
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteText(textEl.id)}
                      className="bg-red-600 rounded-lg px-4 py-2"
                    >
                      <Text className="text-white font-bold">🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Save Button */}
            <TouchableOpacity
              onPress={saveEditedImage}
              className="bg-green-600 rounded-lg p-4 mb-8"
            >
              <Text className="text-white text-center font-bold text-lg">
                💾 Save Edited Image
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

// Draggable Text Component
function DraggableText({ textElement, isSelected, onPress, onMove }) {
  const pan = useRef(
    new Animated.ValueXY({ x: textElement.x, y: textElement.y })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPress(),
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        onMove(pan.x._value, pan.y._value);
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: "absolute",
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        borderWidth: isSelected ? 2 : textElement.borderWidth,
        borderColor: isSelected ? "#00BFFF" : textElement.borderColor,
        backgroundColor: textElement.bgColor,
        padding: 8,
        borderRadius: 6,
      }}
    >
      <Text
        style={{
          fontSize: textElement.size,
          color: textElement.color,
          fontWeight: "bold",
          textShadowColor: "rgba(0,0,0,0.8)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}
      >
        {textElement.text}
      </Text>
    </Animated.View>
  );
}
