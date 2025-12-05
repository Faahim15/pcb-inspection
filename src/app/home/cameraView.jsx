// import React, { useState, useRef } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// export default function CameraScreen() {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [flash, setFlash] = useState("off");
//   const cameraRef = useRef(null);

//   if (!permission) {
//     return <View className="flex-1 bg-black" />;
//   }

//   if (!permission.granted) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center px-[8%]">
//         <Text className="text-white text-center mb-[5%]">
//           We need your permission to show the camera
//         </Text>
//         <TouchableOpacity
//           onPress={requestPermission}
//           className="bg-blue-500 px-[8%] py-[3%] rounded-lg"
//         >
//           <Text className="text-white font-semibold">Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   };

//   const toggleFlash = () => {
//     setFlash((current) => (current === "off" ? "on" : "off"));
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       console.log("Photo taken:", photo);

//       // Navigate to analysis screen with photo URI
//       router.push({
//         pathname: "home/analysis",
//         params: { photoUri: photo.uri },
//       });
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       console.log("Selected image:", result.assets[0]);

//       // Navigate to analysis screen with selected image URI
//       router.push({
//         pathname: "/home/analysis",
//         params: { photoUri: result.assets[0].uri },
//       });
//     }
//   };

//   return (
//     <View className="flex-1 bg-black">
//       <CameraView
//         ref={cameraRef}
//         style={StyleSheet.absoluteFillObject}
//         facing={facing}
//         enableTorch={flash === "on"}
//       >
//         {/* Top Header */}
//         {/* <View className="absolute top-0 left-0 right-0 pt-[12%] px-[4%]">
//           <View className="flex-row items-center">
//             <View className="bg-red-600 px-[3%] py-[1%] rounded">
//               <Text className="text-white text-xs font-bold">LIVE</Text>
//             </View>
//             <View className="flex-1" />
//           </View>
//         </View> */}

//         {/* Focus Frame Overlay */}
//         <View className="absolute top-[30%] left-[10%] right-[10%] bottom-[35%] border-2 border-cyan-400">
//           {/* Corner Brackets */}
//           <View className="absolute top-[-2px] left-[-2px] w-[15%] h-[8%] border-t-4 border-l-4 border-cyan-400" />
//           <View className="absolute top-[-2px] right-[-2px] w-[15%] h-[8%] border-t-4 border-r-4 border-cyan-400" />
//           <View className="absolute bottom-[-2px] left-[-2px] w-[15%] h-[8%] border-b-4 border-l-4 border-cyan-400" />
//           <View className="absolute bottom-[-2px] right-[-2px] w-[15%] h-[8%] border-b-4 border-r-4 border-cyan-400" />
//         </View>

//         {/* Bottom Controls */}
//         <View className="absolute bottom-[6%] left-0 right-0 px-[8%]">
//           <View className="flex-row items-center justify-between">
//             {/* Gallery Button */}
//             <TouchableOpacity
//               onPress={pickImage}
//               className="w-[15%] aspect-square border-2 border-white rounded-lg items-center justify-center"
//             >
//               <Ionicons name="images" size={24} color="white" />
//             </TouchableOpacity>

//             {/* Capture Button */}
//             <TouchableOpacity
//               onPress={takePicture}
//               className="w-[20%] aspect-square rounded-full border-4 border-white items-center justify-center bg-blue-500"
//             >
//               <Ionicons name="camera" size={32} color="white" />
//             </TouchableOpacity>

//             {/* Flash Toggle Button */}
//             <TouchableOpacity
//               onPress={toggleFlash}
//               className="w-[15%] aspect-square bg-gray-800/80 rounded-full items-center justify-center"
//             >
//               <Ionicons
//                 name={flash === "on" ? "flash" : "flash-off"}
//                 size={24}
//                 color="white"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </CameraView>
//     </View>
//   );
// }


// import React, { useState, useRef } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// // ============================================
// // API CONFIGURATION
// // ============================================
// const API_BASE_URL = "http://10.36.72.131:8005"; // Your PC IP and correct port
// const API_ENDPOINT = `${API_BASE_URL}/api/detect/both`;

// export default function CameraScreen() {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [flash, setFlash] = useState("off");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const cameraRef = useRef(null);

//   if (!permission) {
//     return <View className="flex-1 bg-black" />;
//   }

//   if (!permission.granted) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center px-[8%]">
//         <Text className="text-white text-center mb-[5%]">
//           We need your permission to show the camera
//         </Text>
//         <TouchableOpacity
//           onPress={requestPermission}
//           className="bg-blue-500 px-[8%] py-[3%] rounded-lg"
//         >
//           <Text className="text-white font-semibold">Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const toggleFlash = () => {
//     setFlash((current) => (current === "off" ? "on" : "off"));
//   };

//   /**
//    * Analyzes image using PCB detection API
//    */
//   const analyzeImage = async (imageUri) => {
//     setIsAnalyzing(true);
    
//     try {
//       console.log('Starting analysis...');
//       console.log('Image URI:', imageUri);
//       console.log('API Endpoint:', API_ENDPOINT);

//       // Create FormData
//       const formData = new FormData();
      
//       // Get file info
//       const filename = imageUri.split('/').pop();
//       const match = /\.(\w+)$/.exec(filename);
//       const type = match ? `image/${match[1]}` : 'image/jpeg';
      
//       console.log('File details:', { filename, type });
      
//       // Append file - CRITICAL: Use proper format for React Native
//       formData.append('file', {
//         uri: imageUri,
//         name: filename || 'photo.jpg',
//         type: type,
//       });

//       console.log('Sending request to:', API_ENDPOINT);

//       // Make API call with proper headers
//       const response = await fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('API Error Response:', errorText);
//         throw new Error(`API Error (${response.status}): ${errorText}`);
//       }

//       const result = await response.json();
//       console.log('Analysis successful:', result);
      
//       // Validate response
//       const deepPCBSuccess = result.deeppcb?.success;
//       const hriPCBSuccess = result.hripcb?.success;
      
//       if (!deepPCBSuccess && !hriPCBSuccess) {
//         throw new Error('Analysis failed for both models');
//       }

//       const totalDefects = 
//         (result.deeppcb?.predictions?.predictions?.length || 0) +
//         (result.hripcb?.predictions?.predictions?.length || 0);

//       console.log(`Found ${totalDefects} defects`);
      
//       // Navigate to analysis screen
//       router.push({
//         pathname: "/home/analysis",
//         params: { 
//           photoUri: imageUri,
//           analysisData: JSON.stringify(result)
//         },
//       });
      
//     } catch (error) {
//       console.error('Analysis error:', error);
//       console.error('Error details:', {
//         name: error.name,
//         message: error.message,
//         stack: error.stack
//       });
      
//       let errorMessage = 'Failed to analyze the image.';
      
//       if (error.message.includes('Network request failed')) {
//         errorMessage = `Cannot connect to server at ${API_BASE_URL}.\n\nPlease check:\n• Server is running\n• Device is on same network\n• Firewall allows connections`;
//       } else if (error.message.includes('timeout')) {
//         errorMessage = 'Request timed out. The server may be processing. Please try again.';
//       } else if (error.message.includes('fetch')) {
//         errorMessage = `Network error. Check if server is accessible at ${API_BASE_URL}`;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       Alert.alert(
//         'Analysis Failed',
//         errorMessage,
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { 
//             text: 'Retry', 
//             onPress: () => analyzeImage(imageUri),
//             style: 'default'
//           }
//         ]
//       );
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   /**
//    * Captures photo from camera
//    */
//   const takePicture = async () => {
//     if (cameraRef.current && !isAnalyzing) {
//       try {
//         const photo = await cameraRef.current.takePictureAsync({
//           quality: 0.8,
//           skipProcessing: false,
//         });
//         console.log("Photo taken:", photo.uri);
//         await analyzeImage(photo.uri);
//       } catch (error) {
//         console.error('Camera error:', error);
//         Alert.alert('Error', 'Failed to take picture. Please try again.');
//       }
//     }
//   };

//   /**
//    * Opens image picker
//    */
//   const pickImage = async () => {
//     if (isAnalyzing) return;
    
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ["images"],
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         console.log("Selected image:", result.assets[0].uri);
//         await analyzeImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       console.error('Image picker error:', error);
//       Alert.alert('Error', 'Failed to select image. Please try again.');
//     }
//   };

//   return (
//     <View className="flex-1 bg-black">
//       {/* Camera View - NO CHILDREN INSIDE */}
//       <CameraView
//         ref={cameraRef}
//         style={StyleSheet.absoluteFillObject}
//         facing={facing}
//         enableTorch={flash === "on"}
//       />

//       {/* ALL OVERLAYS OUTSIDE CAMERA VIEW */}
      
//       {/* Focus Frame Overlay */}
//       <View 
//         style={StyleSheet.absoluteFillObject}
//         pointerEvents="none"
//       >
//         <View className="absolute top-[30%] left-[10%] right-[10%] bottom-[35%] border-2 border-cyan-400">
//           {/* Corner Brackets */}
//           <View className="absolute top-[-2px] left-[-2px] w-[15%] h-[8%] border-t-4 border-l-4 border-cyan-400" />
//           <View className="absolute top-[-2px] right-[-2px] w-[15%] h-[8%] border-t-4 border-r-4 border-cyan-400" />
//           <View className="absolute bottom-[-2px] left-[-2px] w-[15%] h-[8%] border-b-4 border-l-4 border-cyan-400" />
//           <View className="absolute bottom-[-2px] right-[-2px] w-[15%] h-[8%] border-b-4 border-r-4 border-cyan-400" />
//         </View>
//       </View>

//       {/* Loading Overlay */}
//       {isAnalyzing && (
//         <View 
//           style={StyleSheet.absoluteFillObject}
//           className="bg-black/70 justify-center items-center"
//         >
//           <View className="bg-gray-800 p-8 rounded-2xl items-center">
//             <ActivityIndicator size="large" color="#3b82f6" />
//             <Text className="text-white text-lg font-semibold mt-4">
//               Analyzing PCB...
//             </Text>
//             <Text className="text-gray-400 text-sm mt-2">
//               Running DeepPCB & HRIPCB models
//             </Text>
//             <Text className="text-gray-500 text-xs mt-3">
//               {API_BASE_URL}
//             </Text>
//           </View>
//         </View>
//       )}

//       {/* Bottom Controls */}
//       <View className="absolute bottom-[6%] left-0 right-0 px-[8%]">
//         <View className="flex-row items-center justify-between">
//           {/* Gallery Button */}
//           <TouchableOpacity
//             onPress={pickImage}
//             className="w-[15%] aspect-square border-2 border-white rounded-lg items-center justify-center"
//             disabled={isAnalyzing}
//             style={{ opacity: isAnalyzing ? 0.5 : 1 }}
//           >
//             <Ionicons name="images" size={24} color="white" />
//           </TouchableOpacity>

//           {/* Capture Button */}
//           <TouchableOpacity
//             onPress={takePicture}
//             className="w-[20%] aspect-square rounded-full border-4 border-white items-center justify-center bg-blue-500"
//             disabled={isAnalyzing}
//             style={{ opacity: isAnalyzing ? 0.5 : 1 }}
//           >
//             <Ionicons name="camera" size={32} color="white" />
//           </TouchableOpacity>

//           {/* Flash Toggle Button */}
//           <TouchableOpacity
//             onPress={toggleFlash}
//             className="w-[15%] aspect-square bg-gray-800/80 rounded-full items-center justify-center"
//             disabled={isAnalyzing}
//             style={{ opacity: isAnalyzing ? 0.5 : 1 }}
//           >
//             <Ionicons
//               name={flash === "on" ? "flash" : "flash-off"}
//               size={24}
//               color="white"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }



import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE_URL = "http://10.36.72.131:8005";  
const API_ENDPOINT = `${API_BASE_URL}/api/detect/both`;

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  /**
   * Analyzes image using PCB detection API
   */
  const analyzeImage = async (imageUri) => {
    setIsAnalyzing(true);
    
    try {
      console.log('Starting analysis...');
      console.log('Image URI:', imageUri);
      console.log('API Endpoint:', API_ENDPOINT);

      // Create FormData
      const formData = new FormData();
      
      // Get file info
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      console.log('File details:', { filename, type });
      
      // Append file
      formData.append('file', {
        uri: imageUri,
        name: filename || 'photo.jpg',
        type: type,
      });

      console.log('Sending request to:', API_ENDPOINT);

      // Make API call
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      console.log('Analysis successful:', result);
      
      // Validate response
      const deepPCBSuccess = result.deeppcb?.success;
      const hriPCBSuccess = result.hripcb?.success;
      
      if (!deepPCBSuccess && !hriPCBSuccess) {
        throw new Error('Analysis failed for both models');
      }

      const totalDefects = 
        (result.deeppcb?.predictions?.predictions?.length || 0) +
        (result.hripcb?.predictions?.predictions?.length || 0);

      console.log(`Found ${totalDefects} defects`);
      
      // Navigate to analysis screen
      router.push({
        pathname: "/home/analysis",
        params: { 
          photoUri: imageUri,
          analysisData: JSON.stringify(result)
        },
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      let errorMessage = 'Failed to analyze the image.';
      
      if (error.message.includes('Network request failed')) {
        errorMessage = `Cannot connect to server at ${API_BASE_URL}.\n\nPlease check:\n• Server is running\n• Device is on same network\n• Firewall allows connections`;
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. The server may be processing. Please try again.';
      } else if (error.message.includes('fetch')) {
        errorMessage = `Network error. Check if server is accessible at ${API_BASE_URL}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert(
        'Analysis Failed',
        errorMessage,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Retry', 
            onPress: () => analyzeImage(imageUri),
            style: 'default'
          }
        ]
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Captures photo from camera - FULL IMAGE, NO CROP
   */
  const takePicture = async () => {
    if (cameraRef.current && !isAnalyzing) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1, // Maximum quality
          skipProcessing: false,
          // NO exif or other processing that might crop
        });
        console.log("Photo taken:", photo.uri);
        console.log("Photo dimensions:", photo.width, 'x', photo.height);
        await analyzeImage(photo.uri);
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  /**
   * Opens image picker - FULL IMAGE, NO CROP
   */
  const pickImage = async () => {
    if (isAnalyzing) return;
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false, // ← CHANGED: Disable editing/cropping
        quality: 1, // ← CHANGED: Maximum quality
        // Removed aspect ratio - let user select full image
      });

      if (!result.canceled && result.assets[0]) {
        console.log("Selected image:", result.assets[0].uri);
        console.log("Image dimensions:", result.assets[0].width, 'x', result.assets[0].height);
        await analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  /**
   * Opens image picker WITH manual cropping option
   */
  const pickImageWithCrop = async () => {
    if (isAnalyzing) return;
    
    try {
      // Show action sheet for user choice
      Alert.alert(
        'Select Image',
        'Choose how you want to select the image',
        [
          {
            text: 'Full Image (No Crop)',
            onPress: () => pickImage(),
          },
          {
            text: 'Crop & Select',
            onPress: async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true, // Enable manual cropping
                quality: 1,
                aspect: undefined, // Free aspect ratio
              });

              if (!result.canceled && result.assets[0]) {
                console.log("Selected & cropped image:", result.assets[0].uri);
                await analyzeImage(result.assets[0].uri);
              }
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Camera View - NO CHILDREN INSIDE */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        enableTorch={flash === "on"}
      />

      {/* ALL OVERLAYS OUTSIDE CAMERA VIEW */}
      
      {/* Focus Frame Overlay - Visual guide only, doesn't affect capture */}
      <View 
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      >
        <View className="absolute top-[30%] left-[10%] right-[10%] bottom-[35%] border-2 border-cyan-400">
          {/* Corner Brackets */}
          <View className="absolute top-[-2px] left-[-2px] w-[15%] h-[8%] border-t-4 border-l-4 border-cyan-400" />
          <View className="absolute top-[-2px] right-[-2px] w-[15%] h-[8%] border-t-4 border-r-4 border-cyan-400" />
          <View className="absolute bottom-[-2px] left-[-2px] w-[15%] h-[8%] border-b-4 border-l-4 border-cyan-400" />
          <View className="absolute bottom-[-2px] right-[-2px] w-[15%] h-[8%] border-b-4 border-r-4 border-cyan-400" />
          
          {/* Guide text */}
          <View className="absolute -bottom-8 left-0 right-0 items-center">
            <Text className="text-cyan-400 text-xs">
              Frame is a guide - Full image will be captured
            </Text>
          </View>
        </View>
      </View>

      {/* Loading Overlay */}
      {isAnalyzing && (
        <View 
          style={StyleSheet.absoluteFillObject}
          className="bg-black/70 justify-center items-center"
        >
          <View className="bg-gray-800 p-8 rounded-2xl items-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-white text-lg font-semibold mt-4">
              Analyzing PCB...
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              Running DeepPCB & HRIPCB models
            </Text>
            <Text className="text-gray-500 text-xs mt-3">
              {API_BASE_URL}
            </Text>
          </View>
        </View>
      )}

      {/* Bottom Controls */}
      <View className="absolute bottom-[6%] left-0 right-0 px-[8%]">
        <View className="flex-row items-center justify-between">
          {/* Gallery Button - OPTION 1: Simple (always full image) */}
          <TouchableOpacity
            onPress={pickImage} // ← Simple: always full image
            // OR use pickImageWithCrop for choice dialog
            className="w-[15%] aspect-square border-2 border-white rounded-lg items-center justify-center"
            disabled={isAnalyzing}
            style={{ opacity: isAnalyzing ? 0.5 : 1 }}
          >
            <Ionicons name="images" size={24} color="white" />
          </TouchableOpacity>

          {/* Capture Button - Always captures full image */}
          <TouchableOpacity
            onPress={takePicture}
            className="w-[20%] aspect-square rounded-full border-4 border-white items-center justify-center bg-blue-500"
            disabled={isAnalyzing}
            style={{ opacity: isAnalyzing ? 0.5 : 1 }}
          >
            <Ionicons name="camera" size={32} color="white" />
          </TouchableOpacity>

          {/* Flash Toggle Button */}
          <TouchableOpacity
            onPress={toggleFlash}
            className="w-[15%] aspect-square bg-gray-800/80 rounded-full items-center justify-center"
            disabled={isAnalyzing}
            style={{ opacity: isAnalyzing ? 0.5 : 1 }}
          >
            <Ionicons
              name={flash === "on" ? "flash" : "flash-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        
        {/* Info text */}
        <Text className="text-gray-400 text-xs text-center mt-3">
          Camera captures full resolution • Gallery shows original images
        </Text>
      </View>
    </View>
  );
}