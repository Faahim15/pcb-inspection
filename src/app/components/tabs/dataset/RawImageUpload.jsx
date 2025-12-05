// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";

// export default function DatasetUpload() {
//   const [images, setImages] = useState([]);

//   const pickImages = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission needed",
//           "Please grant camera roll permissions to upload images."
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ["images"],
//         allowsMultipleSelection: true,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setImages([...images, ...result.assets.map((asset) => asset.uri)]);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick images");
//     }
//   };

//   const removeImage = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages);
//   };

//   const renderImagePlaceholder = (uri, index) => {
//     if (uri) {
//       return (
//         <View className="relative w-[28%] aspect-square bg-gray-100 rounded-lg overflow-hidden mb-[4%]">
//           <Image
//             source={{ uri }}
//             className="w-full h-full"
//             resizeMode="cover"
//           />
//           <TouchableOpacity
//             onPress={() => removeImage(index)}
//             className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
//           >
//             <Ionicons name="close" size={16} color="white" />
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <View className="w-[28%] aspect-square bg-gray-100 rounded-lg items-center justify-center mb-[4%]">
//         <Ionicons name="image-outline" size={40} color="#9CA3AF" />
//       </View>
//     );
//   };

//   const placeholders = [...images];
//   while (placeholders.length < 3) {
//     placeholders.push(null);
//   }

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="px-[6%] py-[8%]">
//         {/* Header */}
//         <View className="flex-row items-center mb-[6%]">
//           <Ionicons name="albums" size={24} color="#8B5CF6" />
//           <Text className="text-xl font-bold text-gray-800 ml-[3%]">
//             Dataset Contents
//           </Text>
//         </View>

//         {/* Image Grid */}
//         <View className="flex-row flex-wrap justify-between">
//           {placeholders.map((uri, index) => (
//             <React.Fragment key={index}>
//               {renderImagePlaceholder(uri, index)}
//             </React.Fragment>
//           ))}
//         </View>

//         {/* Section Title */}
//         <View className="mt-[2%]">
//           <Text className="text-base font-semibold text-gray-800 mb-[2%]">
//             1. Raw Images
//           </Text>
//           <Text className="text-sm text-gray-500 mb-[6%]">
//             These are your original uploads.
//           </Text>
//         </View>

//         {/* Upload Button */}
//         <TouchableOpacity
//           onPress={pickImages}
//           className="bg-purple-600 rounded-lg py-[3.5%] px-[6%] flex-row items-center justify-center self-end"
//         >
//           <Ionicons name="add" size={20} color="white" />
//           <Text className="text-white font-semibold text-base ml-[2%]">
//             Upload More
//           </Text>
//         </TouchableOpacity>

//         {/* Images Count */}
//         {images.length > 0 && (
//           <Text className="text-sm text-gray-600 mt-[4%] text-center">
//             {images.length} {images.length === 1 ? "image" : "images"} uploaded
//           </Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// }


// // DatasetUploadWithAPI.js
// // Production-ready React Native component to pick images and upload to a multipart API endpoint.
// // Features:
// // - multiple image selection (expo-image-picker)
// // - per-image preview, remove
// // - per-image upload with progress reporting (XMLHttpRequest)
// // - sequential "Upload All" with robust error handling
// // - accepts auth token via prop or falls back to AsyncStorage
// // - configurable apiUrl via prop
// // Usage:
// // <DatasetUpload authToken={token} apiUrl="http://localhost:8081/v1/uploads/multipart" />

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
//   Platform,
//   ActivityIndicator,
//   ProgressBarAndroid,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function DatasetUpload({ authToken = null, apiUrl = "http://localhost:8081/v1/uploads/multipart" }) {
//   // images: [{ uri, name, type, uploading, progress (0-1), gcsUri, error }]
//   const [images, setImages] = useState([]);
//   const [uploadingAll, setUploadingAll] = useState(false);

//   useEffect(() => {
//     // nothing for now, but left here for potential token loading logic
//   }, []);

//   const ensureToken = async () => {
//     if (authToken) return authToken;
//     // fallback: try to load from AsyncStorage. Replace with your auth/store logic.
//     try {
//       const tok = await AsyncStorage.getItem('authToken');
//       return tok;
//     } catch (e) {
//       return null;
//     }
//   };

//   const pickImages = async () => {
//     try {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission needed",
//           "Please grant media library permissions to upload images."
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsMultipleSelection: true,
//         quality: 0.8,
//       });

//       if (!result.canceled) {
//         // transform to our internal format
//         const picked = result.assets.map((asset) => {
//           const uri = asset.uri;
//           const filename = asset.fileName || uri.split('/').pop() || `photo_${Date.now()}`;
//           // infer mime type from extension as best-effort
//           const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : 'jpg';
//           const mime = asset.type ? `${asset.type}/${ext}` : `image/${ext === 'jpg' ? 'jpeg' : ext}`;

//           return {
//             uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
//             name: filename,
//             type: mime,
//             uploading: false,
//             progress: 0,
//             gcsUri: null,
//             error: null,
//           };
//         });

//         setImages((prev) => [...prev, ...picked]);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick images.");
//       console.error("pickImages error", error);
//     }
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const uploadSingle = async (index) => {
//     const token = await ensureToken();
//     if (!token) {
//       Alert.alert('Authentication', 'No auth token found. Please log in.');
//       return;
//     }

//     setImages((prev) => {
//       const copy = [...prev];
//       copy[index] = { ...copy[index], uploading: true, progress: 0, error: null };
//       return copy;
//     });

//     const file = images[index];

//     return new Promise((resolve) => {
//       try {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', apiUrl);
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             const progress = event.loaded / event.total;
//             setImages((prev) => {
//               const copy = [...prev];
//               copy[index] = { ...copy[index], progress };
//               return copy;
//             });
//           }
//         };

//         xhr.onload = () => {
//           const ok = xhr.status >= 200 && xhr.status < 300;
//           let resp = null;
//           try {
//             resp = JSON.parse(xhr.responseText || '{}');
//           } catch (e) {
//             // ignore
//           }

//           setImages((prev) => {
//             const copy = [...prev];
//             copy[index] = {
//               ...copy[index],
//               uploading: false,
//               progress: ok ? 1 : copy[index].progress,
//               gcsUri: ok && resp && resp.gcsUri ? resp.gcsUri : copy[index].gcsUri,
//               error: ok ? null : `Upload failed (status ${xhr.status})`,
//             };
//             return copy;
//           });

//           if (!ok) {
//             console.error('Upload failed', xhr.status, xhr.responseText);
//             resolve({ ok: false, status: xhr.status, body: xhr.responseText });
//           } else {
//             resolve({ ok: true, body: resp });
//           }
//         };

//         xhr.onerror = () => {
//           setImages((prev) => {
//             const copy = [...prev];
//             copy[index] = { ...copy[index], uploading: false, error: 'Network error' };
//             return copy;
//           });
//           console.error('XHR network error');
//           resolve({ ok: false, error: 'network' });
//         };

//         const formData = new FormData();
//         // In React Native environment, append the file object with uri/name/type
//         formData.append('file', {
//           uri: file.uri,
//           name: file.name,
//           type: file.type,
//         });

//         xhr.send(formData);
//       } catch (err) {
//         setImages((prev) => {
//           const copy = [...prev];
//           copy[index] = { ...copy[index], uploading: false, error: err.message };
//           return copy;
//         });
//         console.error('uploadSingle exception', err);
//         resolve({ ok: false, error: err });
//       }
//     });
//   };

//   const uploadAll = async () => {
//     if (images.length === 0) {
//       Alert.alert('No images', 'Please add images before uploading.');
//       return;
//     }

//     setUploadingAll(true);
//     for (let i = 0; i < images.length; i++) {
//       // skip already uploaded successful images
//       if (images[i].gcsUri) continue;
//       // perform upload sequentially to keep memory/CPU stable and to show progress clearly
//       // eslint-disable-next-line no-await-in-loop
//       await uploadSingle(i);
//     }
//     setUploadingAll(false);
//   };

//   const placeholders = [...images];
//   while (placeholders.length < 3) placeholders.push(null);

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
//       <View style={{ paddingHorizontal: '6%', paddingVertical: '8%' }}>
//         {/* Header */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '6%' }}>
//           <Ionicons name="albums" size={24} color="#8B5CF6" />
//           <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937', marginLeft: '3%' }}>
//             Dataset Contents
//           </Text>
//         </View>

//         {/* Image Grid */}
//         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
//           {placeholders.map((img, index) => (
//             <View key={index} style={{ width: '28%', aspectRatio: 1, backgroundColor: '#F3F4F6', borderRadius: 12, marginBottom: '4%', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
//               {img ? (
//                 <>
//                   <Image source={{ uri: img.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
//                   <TouchableOpacity onPress={() => removeImage(index)} style={{ position: 'absolute', top: 6, right: 6, backgroundColor: '#DC2626', borderRadius: 999, padding: 6 }}>
//                     <Ionicons name="close" size={16} color="white" />
//                   </TouchableOpacity>
//                 </>
//               ) : (
//                 <Ionicons name="image-outline" size={40} color="#9CA3AF" />
//               )}
//             </View>
//           ))}
//         </View>

//         {/* Section Title */}
//         <View style={{ marginTop: '2%' }}>
//           <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: '2%' }}>1. Raw Images</Text>
//           <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: '6%' }}>These are your original uploads.</Text>
//         </View>

//         {/* Upload / Pick Buttons */}
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
//           <TouchableOpacity onPress={pickImages} style={{ backgroundColor: '#10B981', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
//             <Ionicons name="images" size={18} color="white" />
//             <Text style={{ color: 'white', fontWeight: '600', marginLeft: 8 }}>Pick Images</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={uploadAll} disabled={uploadingAll} style={{ backgroundColor: uploadingAll ? '#A78BFA' : '#7C3AED', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
//             {uploadingAll ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Ionicons name="cloud-upload" size={18} color="white" />
//             )}
//             <Text style={{ color: 'white', fontWeight: '600', marginLeft: 8 }}>{uploadingAll ? 'Uploading...' : 'Upload All'}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Images Count */}
//         {images.length > 0 && (
//           <Text style={{ fontSize: 13, color: '#4B5563', marginTop: 12, textAlign: 'center' }}>
//             {images.length} {images.length === 1 ? 'image' : 'images'} added
//           </Text>
//         )}

//         {/* Per-image status */}
//         <View style={{ marginTop: 16 }}>
//           {images.map((img, idx) => (
//             <View key={`status-${idx}`} style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Text style={{ flex: 1, marginRight: 8 }} numberOfLines={1}>{img.name}</Text>
//                 {img.uploading ? (
//                   <Text style={{ fontSize: 12, color: '#6B7280' }}>{Math.round(img.progress * 100)}%</Text>
//                 ) : img.gcsUri ? (
//                   <Text style={{ fontSize: 12, color: '#10B981' }}>Uploaded</Text>
//                 ) : img.error ? (
//                   <Text style={{ fontSize: 12, color: '#DC2626' }}>Error</Text>
//                 ) : (
//                   <Text style={{ fontSize: 12, color: '#6B7280' }}>Ready</Text>
//                 )}
//               </View>

//               {/* Progress bar (Android uses ProgressBarAndroid; iOS will fallback to a simple view) */}
//               <View style={{ marginTop: 8 }}>
//                 {Platform.OS === 'android' ? (
//                   <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={img.progress} />
//                 ) : (
//                   <View style={{ height: 6, backgroundColor: '#E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
//                     <View style={{ height: 6, width: `${Math.round(img.progress * 100)}%`, backgroundColor: '#7C3AED' }} />
//                   </View>
//                 )}

//                 {img.error && <Text style={{ color: '#DC2626', marginTop: 6 }}>{img.error}</Text>}

//                 {img.gcsUri && (
//                   <Text style={{ color: '#6B7280', marginTop: 6, fontSize: 12 }} numberOfLines={1}>{img.gcsUri}</Text>
//                 )}
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// }


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Configuration
// For Android Emulator use: http://10.0.2.2:8081
// For iOS Simulator use: http://localhost:8081
// For Physical Device use your computer's local IP: http://192.168.x.x:8081
// To find your IP: Windows (ipconfig), Mac/Linux (ifconfig)
const API_BASE_URL = "http://10.0.2.2:8080"; // Update based on your setup
const UPLOAD_ENDPOINT = "/v1/uploads/multipart";

export default function DatasetUpload() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  // Get auth token - Update this based on your auth implementation
  const getAuthToken = async () => {
    // TODO: Replace this with your actual token retrieval logic
    // For example: await AsyncStorage.getItem('authToken')
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1ZTQ0MGFlOTQxZTk5ODFlZTJmYTEzNzZkNDJjNDZkNzMxZGVlM2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExNjcxNTUyMDk3MTI0ODA1MTI0IiwiaGQiOiJhbG1haGFydmVzdC5jb20iLCJlbWFpbCI6ImRyLnNoYW1pbS5ha2h0ZXJAYWxtYWhhcnZlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLRTR2a2V1LXB6MmJNQ1V1d2JhRzZRIiwiaWF0IjoxNzYyNjAwNDg1LCJleHAiOjE3NjI2MDQwODV9.AoE6zO7_BRKNeu-h2qFUcbvoEAeWg_mcXNelH5bBNMReXlPIHryRnLt_bTIe7X9uLYtVDJDuiY51yC0JhfZZHjAMqvpbmbmGaGCr5RYDQmE8rC0D0CkaON97NmPIA3Ljrm_v9z5MHScUjbmpWeWRTtmTVWt34pHBQ2Z1vnh9yTRL8DFCClqXsMiS00wVBc0CgslKOrj1V8KnKMHlc7pq5uuLeL3qlx4NFubdTyAajnINuRgVCafI1S_aApVv2CxcpbGA1egz_nHt9rPcOO8dft4W2VF3ZqcVXzUGTjy2LSO9Hp9W9wOHdduy5ATHVnq19Dm3KPhyKDficmyUJzLV_Q";
    return token;
  };

  const uploadImageToCloud = async (imageUri, index) => {
    try {
      const token = await getAuthToken();
      
      // Create FormData
      const formData = new FormData();
      
      // Extract filename from URI
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      // For React Native, file object structure
      formData.append('file', {
        uri: imageUri,
        name: filename,
        type: type,
      });

      console.log('Uploading to:', `${API_BASE_URL}${UPLOAD_ENDPOINT}`);
      console.log('Image URI:', imageUri);

      // Make API request with proper timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_BASE_URL}${UPLOAD_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Upload success:', result);
      
      return {
        localUri: imageUri,
        gcsUri: result.gcsUri,
        uploaded: true,
      };
    } catch (error) {
      console.error('Upload error:', error);
      
      // Provide more specific error messages
      if (error.name === 'AbortError') {
        throw new Error('Upload timeout - please check your connection');
      } else if (error.message.includes('Network request failed')) {
        throw new Error('Cannot connect to server - please check API_BASE_URL configuration');
      }
      
      throw error;
    }
  };

  const pickImages = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        await uploadSelectedImages(result.assets);
      }
    } catch (error) {
      console.error('Pick images error:', error);
      Alert.alert("Error", "Failed to pick images");
    }
  };

  const uploadSelectedImages = async (assets) => {
    setUploading(true);
    const newImages = [];
    const failedUploads = [];

    try {
      // Upload images sequentially
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const imageIndex = images.length + i;

        try {
          // Update progress
          setUploadProgress((prev) => ({
            ...prev,
            [imageIndex]: { status: 'uploading', progress: 0 },
          }));

          // Upload image
          const uploadedImage = await uploadImageToCloud(asset.uri, imageIndex);
          newImages.push(uploadedImage);

          // Update progress
          setUploadProgress((prev) => ({
            ...prev,
            [imageIndex]: { status: 'success', progress: 100 },
          }));
        } catch (error) {
          console.error(`Failed to upload image ${i}:`, error);
          failedUploads.push(i + 1);
          
          setUploadProgress((prev) => ({
            ...prev,
            [imageIndex]: { status: 'failed', progress: 0 },
          }));
        }
      }

      // Update images state with successfully uploaded images
      if (newImages.length > 0) {
        setImages([...images, ...newImages]);
      }

      // Show results
      if (failedUploads.length > 0) {
        Alert.alert(
          "Upload Complete",
          `${newImages.length} image(s) uploaded successfully.\n${failedUploads.length} failed to upload.\n\nPlease check your network connection and API configuration.`,
          [{ text: "OK" }]
        );
      } else if (newImages.length > 0) {
        Alert.alert(
          "Success",
          `${newImages.length} image(s) uploaded successfully!`,
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error('Upload batch error:', error);
      Alert.alert(
        "Error", 
        error.message || "An unexpected error occurred during upload"
      );
    } finally {
      setUploading(false);
      // Clear progress after a delay
      setTimeout(() => setUploadProgress({}), 2000);
    }
  };

  const removeImage = (index) => {
    Alert.alert(
      "Remove Image",
      "Are you sure you want to remove this image?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
          },
        },
      ]
    );
  };

  const renderImagePlaceholder = (imageData, index) => {
    if (imageData) {
      const progress = uploadProgress[index];
      const isUploading = progress?.status === 'uploading';
      const hasFailed = progress?.status === 'failed';

      return (
        <View className="relative w-[28%] aspect-square bg-gray-100 rounded-lg overflow-hidden mb-[4%]">
          <Image
            source={{ uri: imageData.localUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
          
          {/* Upload Status Overlay */}
          {isUploading && (
            <View className="absolute inset-0 bg-black/50 items-center justify-center">
              <View className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </View>
          )}
          
          {hasFailed && (
            <View className="absolute inset-0 bg-red-500/50 items-center justify-center">
              <Ionicons name="warning" size={24} color="white" />
            </View>
          )}

          {/* Success Indicator */}
          {imageData.uploaded && !isUploading && (
            <View className="absolute top-1 left-1 bg-green-500 rounded-full p-1">
              <Ionicons name="checkmark" size={12} color="white" />
            </View>
          )}

          {/* Remove Button */}
          {!isUploading && (
            <TouchableOpacity
              onPress={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <View className="w-[28%] aspect-square bg-gray-100 rounded-lg items-center justify-center mb-[4%]">
        <Ionicons name="image-outline" size={40} color="#9CA3AF" />
      </View>
    );
  };

  const placeholders = [...images];
  while (placeholders.length < 3) {
    placeholders.push(null);
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-[6%] py-[8%]">
        {/* Header */}
        <View className="flex-row items-center mb-[6%]">
          <Ionicons name="albums" size={24} color="#8B5CF6" />
          <Text className="text-xl font-bold text-gray-800 ml-[3%]">
            Dataset Contents
          </Text>
        </View>

        {/* Image Grid */}
        <View className="flex-row flex-wrap justify-between">
          {placeholders.map((imageData, index) => (
            <React.Fragment key={index}>
              {renderImagePlaceholder(imageData, index)}
            </React.Fragment>
          ))}
        </View>

        {/* Section Title */}
        <View className="mt-[2%]">
          <Text className="text-base font-semibold text-gray-800 mb-[2%]">
            1. Raw Images
          </Text>
          <Text className="text-sm text-gray-500 mb-[6%]">
            These are your original uploads stored in Google Cloud Storage.
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          onPress={pickImages}
          disabled={uploading}
          className={`rounded-lg py-[3.5%] px-[6%] flex-row items-center justify-center self-end ${
            uploading ? "bg-purple-400" : "bg-purple-600"
          }`}
        >
          {uploading ? (
            <>
              <Ionicons name="cloud-upload" size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-[2%]">
                Uploading...
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="add" size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-[2%]">
                Upload More
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Images Count */}
        {images.length > 0 && (
          <View className="mt-[4%]">
            <Text className="text-sm text-gray-600 text-center">
              {images.length} {images.length === 1 ? "image" : "images"} uploaded
            </Text>
            <Text className="text-xs text-gray-400 text-center mt-1">
              {images.filter(img => img.uploaded).length} stored in cloud
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}