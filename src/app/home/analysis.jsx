// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, router } from "expo-router";

// export default function AnalysisResultScreen() {
//   // Get the photo URI from route params
//   const { photoUri } = useLocalSearchParams();
//   console.log("photoUrsi", photoUri);
//   const defects = [
//     {
//       id: 1,
//       type: "Short Circuit (R3)",
//       icon: "flash",
//       severity: "critical",
//       color: "bg-red-50 border-red-200",
//       textColor: "text-red-700",
//       iconColor: "#dc2626",
//     },
//     {
//       id: 2,
//       type: "Open Circuit (C12)",
//       icon: "git-compare",
//       severity: "warning",
//       color: "bg-gray-50 border-gray-200",
//       textColor: "text-gray-700",
//       iconColor: "#4b5563",
//     },
//     {
//       id: 3,
//       type: "Missing Component (U5)",
//       icon: "cube-outline",
//       severity: "warning",
//       color: "bg-gray-50 border-gray-200",
//       textColor: "text-gray-700",
//       iconColor: "#4b5563",
//     },
//     {
//       id: 4,
//       type: "Incorrect Polarity (D7)",
//       icon: "add-circle-outline",
//       severity: "warning",
//       color: "bg-gray-50 border-gray-200",
//       textColor: "text-gray-700",
//       iconColor: "#4b5563",
//     },
//   ];

//   const handleClose = () => {
//     router.back();
//   };

//   const handleAnalyzeAnother = () => {
//     router.back();
//   };

//   return (
//     <View className="flex-1 bg-white">
//       {/* PCB Image with Success Banner */}
//       <View className="relative h-[45%] bg-gray-900">
//         {/* Display the captured/selected PCB Image */}
//         {photoUri ? (
//           <Image
//             source={{ uri: photoUri }}
//             className="w-full h-full"
//             resizeMode="cover"
//           />
//         ) : (
//           <View className="w-full h-full items-center justify-center">
//             <Text className="text-gray-500 text-base">No Image</Text>
//           </View>
//         )}

//         {/* Success Banner */}
//         <View className="absolute top-[8%] left-[4%] right-[4%]">
//           <View className="bg-green-500 rounded-lg px-[4%] py-[3%] flex-row items-center">
//             <Ionicons name="checkmark-circle" size={24} color="white" />
//             <Text className="text-white font-semibold text-base ml-[3%]">
//               Analysis Successful
//             </Text>
//           </View>
//         </View>

//         {/* Close Button */}
//         <TouchableOpacity
//           onPress={handleClose}
//           className="absolute top-[8%] right-[4%] bg-black/50 rounded-full p-[2.5%]"
//         >
//           <Ionicons name="close" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Defects List */}
//       <View className="flex-1 bg-white">
//         <ScrollView className="flex-1">
//           {/* Header */}
//           <View className="px-[6%] pt-[6%] pb-[4%] border-b border-gray-200">
//             <View className="flex-row items-center">
//               <Ionicons name="flash" size={24} color="#ef4444" />
//               <Text className="text-gray-900 font-bold text-lg ml-[3%]">
//                 Detected Defects ({defects.length})
//               </Text>
//             </View>
//           </View>

//           {/* Defects List */}
//           <View className="px-[6%] py-[4%]">
//             {defects.map((defect) => (
//               <TouchableOpacity
//                 key={defect.id}
//                 className={`${defect.color} border rounded-xl px-[5%] py-[4%] mb-[3%] flex-row items-center`}
//               >
//                 <View className="mr-[4%]">
//                   <Ionicons
//                     name={defect.icon}
//                     size={24}
//                     color={defect.iconColor}
//                   />
//                 </View>
//                 <Text
//                   className={`${defect.textColor} font-medium text-base flex-1`}
//                 >
//                   {defect.type}
//                 </Text>
//                 <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Action Buttons */}
//           <View className="px-[6%] pb-[8%] pt-[4%]">
//             <TouchableOpacity className="bg-purple-600 rounded-xl py-[4%] items-center mb-[3%]">
//               <Text className="text-white font-poppins-semiBold text-base">
//                 Export Report
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handleAnalyzeAnother}
//               className="bg-gray-100 rounded-xl py-[4%] items-center border border-gray-300"
//             >
//               <Text className="text-gray-700 font-poppins-semiBold text-base">
//                 Analyze Another PCB
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// ====================================================================
// PCB Analysis Result Screen - Analysis Display Component
// ====================================================================
// This component displays PCB analysis results with visual bounding boxes
// overlaid on the captured image, showing detected defects from both
// DeepPCB and HRIPCB models.
// ====================================================================

// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, router } from "expo-router";
// import Svg, { Rect, Text as SvgText } from 'react-native-svg';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // ====================================================================
// // DEFECT TYPE CONFIGURATION
// // Maps defect classes to visual styles (colors, icons, labels)
// // ====================================================================
// const DEFECT_COLORS = {
//   copper: { 
//     color: '#ef4444', 
//     bgColor: '#fef2f2', 
//     borderColor: '#fecaca', 
//     icon: 'flash',
//     severity: 'critical' 
//   },
//   mousebite: { 
//     color: '#f59e0b', 
//     bgColor: '#fffbeb', 
//     borderColor: '#fed7aa', 
//     icon: 'warning',
//     severity: 'warning' 
//   },
//   open: { 
//     color: '#8b5cf6', 
//     bgColor: '#faf5ff', 
//     borderColor: '#e9d5ff', 
//     icon: 'git-compare',
//     severity: 'warning' 
//   },
//   'pin-hole': { 
//     color: '#3b82f6', 
//     bgColor: '#eff6ff', 
//     borderColor: '#bfdbfe', 
//     icon: 'radio-button-on',
//     severity: 'warning' 
//   },
//   short: { 
//     color: '#dc2626', 
//     bgColor: '#fef2f2', 
//     borderColor: '#fecaca', 
//     icon: 'flash',
//     severity: 'critical' 
//   },
//   spurious_copper: { 
//     color: '#d97706', 
//     bgColor: '#fffbeb', 
//     borderColor: '#fed7aa', 
//     icon: 'alert-circle',
//     severity: 'warning' 
//   },
//   missing_hole: { 
//     color: '#ec4899', 
//     bgColor: '#fdf2f8', 
//     borderColor: '#fbcfe8', 
//     icon: 'ellipse-outline',
//     severity: 'warning' 
//   },
// };

// export default function AnalysisResultScreen() {
//   // ====================================================================
//   // STATE MANAGEMENT
//   // ====================================================================
//   const { photoUri, analysisData } = useLocalSearchParams();
//   const [parsedData, setParsedData] = useState(null);
//   const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
//   const [selectedDefect, setSelectedDefect] = useState(null);

//   // ====================================================================
//   // PARSE ANALYSIS DATA FROM ROUTE PARAMS
//   // ====================================================================
//   useEffect(() => {
//     if (analysisData) {
//       try {
//         const data = JSON.parse(analysisData);
//         setParsedData(data);
//         console.log('Parsed analysis data:', data);
//       } catch (error) {
//         console.error('Failed to parse analysis data:', error);
//       }
//     }
//   }, [analysisData]);

//   // ====================================================================
//   // EXTRACT AND COMBINE DEFECTS FROM BOTH MODELS
//   // Merges predictions from DeepPCB and HRIPCB models
//   // ====================================================================
//   const getAllDefects = () => {
//     if (!parsedData) return [];
    
//     const defects = [];
    
//     // Add DeepPCB defects
//     if (parsedData.deeppcb?.predictions?.predictions) {
//       parsedData.deeppcb.predictions.predictions.forEach((pred) => {
//         defects.push({
//           ...pred,
//           model: 'DeepPCB',
//           displayName: pred.class.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
//         });
//       });
//     }
    
//     // Add HRIPCB defects
//     if (parsedData.hripcb?.predictions?.predictions) {
//       parsedData.hripcb.predictions.predictions.forEach((pred) => {
//         defects.push({
//           ...pred,
//           model: 'HRIPCB',
//           displayName: pred.class.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
//         });
//       });
//     }
    
//     // Sort by confidence (highest first)
//     return defects.sort((a, b) => b.confidence - a.confidence);
//   };

//   const defects = getAllDefects();

//   // ====================================================================
//   // IMAGE SIZE CALCULATIONS
//   // Gets original image dimensions from API response
//   // ====================================================================
//   const getOriginalImageSize = () => {
//     if (parsedData?.deeppcb?.predictions?.image) {
//       return parsedData.deeppcb.predictions.image;
//     }
//     if (parsedData?.hripcb?.predictions?.image) {
//       return parsedData.hripcb.predictions.image;
//     }
//     return { width: 640, height: 640 };
//   };

//   const originalSize = getOriginalImageSize();

//   // ====================================================================
//   // CALCULATE SCALE FACTOR FOR BOUNDING BOXES
//   // Converts API coordinates to screen coordinates
//   // ====================================================================
//   const getScaleFactor = () => {
//     if (!imageSize.width || !originalSize.width) return 1;
//     return imageSize.width / originalSize.width;
//   };

//   const scaleFactor = getScaleFactor();

//   // ====================================================================
//   // NAVIGATION HANDLERS
//   // ====================================================================
//   const handleClose = () => {
//     router.back();
//   };

//   const handleAnalyzeAnother = () => {
//     router.back();
//   };

//   const handleExportReport = () => {
//     // TODO: Implement export functionality
//     console.log('Exporting report with defects:', defects);
//   };

//   // ====================================================================
//   // GET DEFECT VISUAL STYLE
//   // Returns color scheme and icon for each defect type
//   // ====================================================================
//   const getDefectStyle = (className) => {
//     return DEFECT_COLORS[className] || DEFECT_COLORS.open;
//   };

//   // ====================================================================
//   // RENDER BOUNDING BOXES ON IMAGE
//   // Draws SVG rectangles and labels for each detected defect
//   // ====================================================================
//   const renderBoundingBoxes = () => {
//     if (!defects.length || !imageSize.width) return null;

//     return (
//       <Svg
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: imageSize.width,
//           height: imageSize.height,
//         }}
//       >
//         {defects.map((defect, index) => {
//           const style = getDefectStyle(defect.class);
          
//           // Convert center coordinates to top-left corner
//           const x = (defect.x - defect.width / 2) * scaleFactor;
//           const y = (defect.y - defect.height / 2) * scaleFactor;
//           const width = defect.width * scaleFactor;
//           const height = defect.height * scaleFactor;

//           // Calculate label position
//           const labelY = y > 25 ? y - 5 : y + height + 15;
//           const labelWidth = Math.max(defect.class.length * 8, 60);

//           return (
//             <React.Fragment key={defect.detection_id || index}>
//               {/* Bounding Box */}
//               <Rect
//                 x={x}
//                 y={y}
//                 width={width}
//                 height={height}
//                 stroke={style.color}
//                 strokeWidth={3}
//                 fill="transparent"
//                 opacity={selectedDefect === index ? 1 : 0.8}
//               />
              
//               {/* Label Background */}
//               <Rect
//                 x={x}
//                 y={labelY - 18}
//                 width={labelWidth}
//                 height={20}
//                 fill={style.color}
//                 opacity={0.95}
//                 rx={4}
//               />
              
//               {/* Label Text */}
//               <SvgText
//                 x={x + 5}
//                 y={labelY - 5}
//                 fill="white"
//                 fontSize="11"
//                 fontWeight="bold"
//               >
//                 {defect.class.toUpperCase()}
//               </SvgText>
//             </React.Fragment>
//           );
//         })}
//       </Svg>
//     );
//   };

//   // ====================================================================
//   // RENDER COMPONENT
//   // ====================================================================
//   return (
//     <View className="flex-1 bg-white">
//       {/* ============================================================ */}
//       {/* PCB IMAGE WITH DETECTION OVERLAYS */}
//       {/* ============================================================ */}
//       <View className="relative h-[45%] bg-gray-900">
//         {photoUri ? (
//           <View style={{ width: '100%', height: '100%' }}>
//             <Image
//               source={{ uri: photoUri }}
//               style={{ width: '100%', height: '100%' }}
//               resizeMode="contain"
//               onLayout={(event) => {
//                 const { width, height } = event.nativeEvent.layout;
//                 setImageSize({ width, height });
//               }}
//             />
//             {renderBoundingBoxes()}
//           </View>
//         ) : (
//           <View className="w-full h-full items-center justify-center">
//             <Ionicons name="image-outline" size={64} color="#6b7280" />
//             <Text className="text-gray-500 text-base mt-4">No Image Available</Text>
//           </View>
//         )}

//         {/* Status Banner */}
//         <View className="absolute top-[8%] left-[4%] right-[4%]">
//           <View 
//             className={`${
//               defects.length > 0 ? 'bg-red-500' : 'bg-green-500'
//             } rounded-lg px-[4%] py-[3%] flex-row items-center shadow-lg`}
//           >
//             <Ionicons 
//               name={defects.length > 0 ? "warning" : "checkmark-circle"} 
//               size={24} 
//               color="white" 
//             />
//             <Text className="text-white font-semibold text-base ml-[3%]">
//               {defects.length > 0 
//                 ? `${defects.length} Defect${defects.length > 1 ? 's' : ''} Detected` 
//                 : 'No Defects Found'}
//             </Text>
//           </View>
//         </View>

//         {/* Close Button */}
//         <TouchableOpacity
//           onPress={handleClose}
//           className="absolute top-[8%] right-[4%] bg-black/60 rounded-full p-[2.5%]"
//           activeOpacity={0.7}
//         >
//           <Ionicons name="close" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* ============================================================ */}
//       {/* DEFECTS LIST AND DETAILS */}
//       {/* ============================================================ */}
//       <View className="flex-1 bg-white">
//         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//           {/* Section Header */}
//           <View className="px-[6%] pt-[6%] pb-[4%] border-b border-gray-200">
//             <View className="flex-row items-center">
//               <Ionicons 
//                 name={defects.length > 0 ? "flash" : "checkmark-circle"} 
//                 size={24} 
//                 color={defects.length > 0 ? "#ef4444" : "#22c55e"} 
//               />
//               <Text className="text-gray-900 font-bold text-lg ml-[3%]">
//                 {defects.length > 0 
//                   ? `Detected Defects (${defects.length})` 
//                   : 'PCB Analysis Complete'}
//               </Text>
//             </View>
//           </View>

//           {/* Defects List */}
//           {defects.length > 0 ? (
//             <View className="px-[6%] py-[4%]">
//               {defects.map((defect, index) => {
//                 const style = getDefectStyle(defect.class);
//                 const isSelected = selectedDefect === index;
                
//                 return (
//                   <TouchableOpacity
//                     key={defect.detection_id || index}
//                     onPress={() => setSelectedDefect(isSelected ? null : index)}
//                     activeOpacity={0.7}
//                     style={{
//                       backgroundColor: style.bgColor,
//                       borderColor: isSelected ? style.color : style.borderColor,
//                       borderWidth: isSelected ? 2 : 1,
//                     }}
//                     className="rounded-xl px-[5%] py-[4%] mb-[3%]"
//                   >
//                     <View className="flex-row items-center">
//                       <View className="mr-[4%]">
//                         <Ionicons
//                           name={style.icon}
//                           size={24}
//                           color={style.color}
//                         />
//                       </View>
                      
//                       <View className="flex-1">
//                         <Text 
//                           style={{ color: style.color }} 
//                           className="font-semibold text-base"
//                         >
//                           {defect.displayName}
//                         </Text>
//                         <Text className="text-gray-600 text-xs mt-1">
//                           Confidence: {(defect.confidence * 100).toFixed(1)}% • {defect.model}
//                         </Text>
                        
//                         {isSelected && (
//                           <View className="mt-2 pt-2 border-t border-gray-300">
//                             <Text className="text-gray-600 text-xs">
//                               📍 Position: ({Math.round(defect.x)}, {Math.round(defect.y)})
//                             </Text>
//                             <Text className="text-gray-600 text-xs mt-1">
//                               📐 Size: {Math.round(defect.width)} × {Math.round(defect.height)} px
//                             </Text>
//                             <Text className="text-gray-600 text-xs mt-1">
//                               🆔 ID: {defect.detection_id.substring(0, 8)}...
//                             </Text>
//                           </View>
//                         )}
//                       </View>
                      
//                       <Ionicons 
//                         name={isSelected ? "chevron-up" : "chevron-down"} 
//                         size={20} 
//                         color="#9ca3af" 
//                       />
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           ) : (
//             <View className="px-[6%] py-[8%] items-center">
//               <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
//               <Text className="text-gray-900 font-semibold text-lg mt-4">
//                 No Defects Found
//               </Text>
//               <Text className="text-gray-600 text-center mt-2 px-[10%]">
//                 The PCB analysis completed successfully with no defects detected.
//               </Text>
//             </View>
//           )}

//           {/* Analysis Metadata */}
//           {parsedData && (
//             <View className="px-[6%] py-[4%] bg-gray-50 mx-[6%] rounded-xl mb-[4%]">
//               <Text className="text-gray-700 font-semibold mb-2 text-sm">
//                 📊 Analysis Details
//               </Text>
//               <Text className="text-gray-600 text-xs mb-1">
//                 DeepPCB: {parsedData.deeppcb?.predictions?.predictions?.length || 0} detections
//                 {parsedData.deeppcb?.predictions?.time && 
//                   ` (${(parsedData.deeppcb.predictions.time * 1000).toFixed(0)}ms)`}
//               </Text>
//               <Text className="text-gray-600 text-xs mb-1">
//                 HRIPCB: {parsedData.hripcb?.predictions?.predictions?.length || 0} detections
//                 {parsedData.hripcb?.predictions?.time && 
//                   ` (${(parsedData.hripcb.predictions.time * 1000).toFixed(0)}ms)`}
//               </Text>
//               <Text className="text-gray-600 text-xs">
//                 Image Size: {originalSize.width} × {originalSize.height} px
//               </Text>
//             </View>
//           )}

//           {/* Action Buttons */}
//           <View className="px-[6%] pb-[8%] pt-[4%]">
//             <TouchableOpacity 
//               onPress={handleExportReport}
//               className="bg-purple-600 rounded-xl py-[4%] items-center mb-[3%]"
//               activeOpacity={0.8}
//             >
//               <Text className="text-white font-semibold text-base">
//                 📄 Export Report
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handleAnalyzeAnother}
//               className="bg-gray-100 rounded-xl py-[4%] items-center border border-gray-300"
//               activeOpacity={0.8}
//             >
//               <Text className="text-gray-700 font-semibold text-base">
//                 📷 Analyze Another PCB
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }



import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import Svg, { Rect, Text as SvgText, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ====================================================================
// DEFECT TYPE CONFIGURATION
// ====================================================================
const DEFECT_COLORS = {
  copper: { 
    color: '#ef4444', 
    bgColor: '#fef2f2', 
    borderColor: '#fecaca', 
    icon: 'flash',
    severity: 'critical' 
  },
  mousebite: { 
    color: '#f59e0b', 
    bgColor: '#fffbeb', 
    borderColor: '#fed7aa', 
    icon: 'warning',
    severity: 'warning' 
  },
  open: { 
    color: '#8b5cf6', 
    bgColor: '#faf5ff', 
    borderColor: '#e9d5ff', 
    icon: 'git-compare',
    severity: 'warning' 
  },
  'pin-hole': { 
    color: '#3b82f6', 
    bgColor: '#eff6ff', 
    borderColor: '#bfdbfe', 
    icon: 'radio-button-on',
    severity: 'warning' 
  },
  short: { 
    color: '#dc2626', 
    bgColor: '#fef2f2', 
    borderColor: '#fecaca', 
    icon: 'flash',
    severity: 'critical' 
  },
  spurious_copper: { 
    color: '#d97706', 
    bgColor: '#fffbeb', 
    borderColor: '#fed7aa', 
    icon: 'alert-circle',
    severity: 'warning' 
  },
  missing_hole: { 
    color: '#ec4899', 
    bgColor: '#fdf2f8', 
    borderColor: '#fbcfe8', 
    icon: 'ellipse-outline',
    severity: 'warning' 
  },
};

export default function AnalysisResultScreen() {
  const { photoUri, analysisData } = useLocalSearchParams();
  const [parsedData, setParsedData] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selectedDefect, setSelectedDefect] = useState(null);

  useEffect(() => {
    if (analysisData) {
      try {
        const data = JSON.parse(analysisData);
        setParsedData(data);
        console.log('Parsed analysis data:', data);
      } catch (error) {
        console.error('Failed to parse analysis data:', error);
      }
    }
  }, [analysisData]);

  console.log('Parsed Data State:', analysisData);

  const getAllDefects = () => {
    if (!parsedData) return [];
    
    const defects = [];
    
    if (parsedData.deeppcb?.predictions?.predictions) {
      parsedData.deeppcb.predictions.predictions.forEach((pred) => {
        defects.push({
          ...pred,
          model: 'DeepPCB',
          displayName: pred.class.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        });
      });
    }
    
    if (parsedData.hripcb?.predictions?.predictions) {
      parsedData.hripcb.predictions.predictions.forEach((pred) => {
        defects.push({
          ...pred,
          model: 'HRIPCB',
          displayName: pred.class.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        });
      });
    }
    
    return defects.sort((a, b) => b.confidence - a.confidence);
  };

  const defects = getAllDefects();

  const getOriginalImageSize = () => {
    if (parsedData?.deeppcb?.predictions?.image) {
      return parsedData.deeppcb.predictions.image;
    }
    if (parsedData?.hripcb?.predictions?.image) {
      return parsedData.hripcb.predictions.image;
    }
    return { width: 640, height: 640 };
  };

  const originalSize = getOriginalImageSize();

  const getScaleFactor = () => {
    if (!imageSize.width || !originalSize.width) return 1;
    return imageSize.width / originalSize.width;
  };

  const scaleFactor = getScaleFactor();

  const handleClose = () => {
    router.back();
  };

  const handleAnalyzeAnother = () => {
    router.back();
  };

  const handleExportReport = () => {
    console.log('Exporting report with defects:', defects);
  };

  const getDefectStyle = (className) => {
    return DEFECT_COLORS[className] || DEFECT_COLORS.open;
  };

  // ====================================================================
  // PROFESSIONAL BOUNDING BOX RENDERER
  // Features: Corner markers, dashed borders, bottom labels, confidence
  // ====================================================================
  const renderBoundingBoxes = () => {
    if (!defects.length || !imageSize.width) return null;

    return (
      <Svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: imageSize.width,
          height: imageSize.height,
        }}
      >
        {defects.map((defect, index) => {
          const style = getDefectStyle(defect.class);
          const isSelected = selectedDefect === index;
          
          // Convert center coordinates to top-left corner
          const x = (defect.x - defect.width / 2) * scaleFactor;
          const y = (defect.y - defect.height / 2) * scaleFactor;
          const width = defect.width * scaleFactor;
          const height = defect.height * scaleFactor;

          // Calculate label dimensions
          const labelText = defect.class.toUpperCase();
          const confidenceText = `${(defect.confidence * 100).toFixed(0)}%`;
          const labelPadding = 8;
          const labelHeight = 24;
          const labelWidth = Math.max(labelText.length * 7.5 + confidenceText.length * 6 + labelPadding * 3, 80);
          
          // Position label at BOTTOM of bounding box
          const labelX = x;
          const labelY = y + height + 6; // 6px gap below box
          
          // Ensure label doesn't go off screen
          const adjustedLabelY = labelY + labelHeight > imageSize.height 
            ? y - labelHeight - 6 // Place above if no room below
            : labelY;
          
          const adjustedLabelX = labelX + labelWidth > imageSize.width
            ? imageSize.width - labelWidth - 4
            : labelX;

          // Corner marker size (dynamic based on box size)
          const cornerSize = Math.min(Math.max(width, height) * 0.12, 20);
          const cornerThickness = 3;

          return (
            <React.Fragment key={defect.detection_id || index}>
              {/* Main Bounding Box with Dashed Border */}
              <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                stroke={style.color}
                strokeWidth={isSelected ? 3 : 2.5}
                strokeDasharray={isSelected ? "0" : "8,4"}
                fill="transparent"
                opacity={isSelected ? 1 : 0.85}
              />
              
              {/* Corner Markers - Top Left */}
              <Rect
                x={x - 1}
                y={y - 1}
                width={cornerSize}
                height={cornerThickness}
                fill={style.color}
              />
              <Rect
                x={x - 1}
                y={y - 1}
                width={cornerThickness}
                height={cornerSize}
                fill={style.color}
              />
              
              {/* Corner Markers - Top Right */}
              <Rect
                x={x + width - cornerSize + 1}
                y={y - 1}
                width={cornerSize}
                height={cornerThickness}
                fill={style.color}
              />
              <Rect
                x={x + width - cornerThickness + 1}
                y={y - 1}
                width={cornerThickness}
                height={cornerSize}
                fill={style.color}
              />
              
              {/* Corner Markers - Bottom Left */}
              <Rect
                x={x - 1}
                y={y + height - cornerThickness + 1}
                width={cornerSize}
                height={cornerThickness}
                fill={style.color}
              />
              <Rect
                x={x - 1}
                y={y + height - cornerSize + 1}
                width={cornerThickness}
                height={cornerSize}
                fill={style.color}
              />
              
              {/* Corner Markers - Bottom Right */}
              <Rect
                x={x + width - cornerSize + 1}
                y={y + height - cornerThickness + 1}
                width={cornerSize}
                height={cornerThickness}
                fill={style.color}
              />
              <Rect
                x={x + width - cornerThickness + 1}
                y={y + height - cornerSize + 1}
                width={cornerThickness}
                height={cornerSize}
                fill={style.color}
              />
              
              {/* Label Shadow for depth */}
              <Rect
                x={adjustedLabelX + 2}
                y={adjustedLabelY + 2}
                width={labelWidth}
                height={labelHeight}
                fill="black"
                opacity={0.3}
                rx={4}
              />
              
              {/* Label Background */}
              <Rect
                x={adjustedLabelX}
                y={adjustedLabelY}
                width={labelWidth}
                height={labelHeight}
                fill={style.color}
                opacity={0.95}
                rx={4}
              />
              
              {/* Label Text - Defect Name */}
              <SvgText
                x={adjustedLabelX + labelPadding}
                y={adjustedLabelY + labelHeight / 2 + 5}
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {labelText}
              </SvgText>
              
              {/* Label Text - Confidence Percentage */}
              <SvgText
                x={adjustedLabelX + labelWidth - labelPadding - confidenceText.length * 6}
                y={adjustedLabelY + labelHeight / 2 + 5}
                fill="white"
                fontSize="11"
                fontWeight="600"
                opacity={0.9}
              >
                {confidenceText}
              </SvgText>
              
              {/* Center Dot Marker (when selected) */}
              {isSelected && (
                <>
                  <Circle
                    cx={defect.x * scaleFactor}
                    cy={defect.y * scaleFactor}
                    r={5}
                    fill={style.color}
                    opacity={0.8}
                  />
                  <Circle
                    cx={defect.x * scaleFactor}
                    cy={defect.y * scaleFactor}
                    r={2}
                    fill="white"
                  />
                </>
              )}
            </React.Fragment>
          );
        })}
      </Svg>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* PCB IMAGE WITH DETECTION OVERLAYS */}
      <View className="relative h-[45%] bg-gray-900">
        {photoUri ? (
          <View style={{ width: '100%', height: '100%' }}>
            <Image
              source={{ uri: photoUri }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setImageSize({ width, height });
              }}
            />
            {renderBoundingBoxes()}
          </View>
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Ionicons name="image-outline" size={64} color="#6b7280" />
            <Text className="text-gray-500 text-base mt-4">No Image Available</Text>
          </View>
        )}

        {/* Status Banner */}
        {/* <View className="absolute top-[8%] left-[4%] right-[4%]">
          <View 
            className={`${
              defects.length > 0 ? 'bg-red-500' : 'bg-green-500'
            } rounded-lg px-[4%] py-[3%] flex-row items-center shadow-lg`}
          >
            <Ionicons 
              name={defects.length > 0 ? "warning" : "checkmark-circle"} 
              size={24} 
              color="white" 
            />
            <Text className="text-white font-semibold text-base ml-[3%]">
              {defects.length > 0 
                ? `${defects.length} Defect${defects.length > 1 ? 's' : ''} Detected` 
                : 'No Defects Found'}
            </Text>
          </View>
        </View> */}

        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute top-[8%] right-[4%] bg-black/60 rounded-full p-[2.5%]"
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* DEFECTS LIST */}
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Section Header */}
          <View className="px-[6%] pt-[6%] pb-[4%] border-b border-gray-200">
            <View className="flex-row items-center">
              <Ionicons 
                name={defects.length > 0 ? "flash" : "checkmark-circle"} 
                size={24} 
                color={defects.length > 0 ? "#ef4444" : "#22c55e"} 
              />
              <Text className="text-gray-900 font-bold text-lg ml-[3%]">
                {defects.length > 0 
                  ? `Detected Defects (${defects.length})` 
                  : 'PCB Analysis Complete'}
              </Text>
            </View>
          </View>

          {/* Defects List */}
          {defects.length > 0 ? (
            <View className="px-[6%] py-[4%]">
              {defects.map((defect, index) => {
                const style = getDefectStyle(defect.class);
                const isSelected = selectedDefect === index;
                
                return (
                  <TouchableOpacity
                    key={defect.detection_id || index}
                    onPress={() => setSelectedDefect(isSelected ? null : index)}
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: style.bgColor,
                      borderColor: isSelected ? style.color : style.borderColor,
                      borderWidth: isSelected ? 2 : 1,
                    }}
                    className="rounded-xl px-[5%] py-[4%] mb-[3%]"
                  >
                    <View className="flex-row items-center">
                      <View className="mr-[4%]">
                        <Ionicons
                          name={style.icon}
                          size={24}
                          color={style.color}
                        />
                      </View>
                      
                      <View className="flex-1">
                        <Text 
                          style={{ color: style.color }} 
                          className="font-semibold text-base"
                        >
                          {defect.displayName}
                        </Text>
                        <Text className="text-gray-600 text-xs mt-1">
                          Confidence: {(defect.confidence * 100).toFixed(1)}% • {defect.model}
                        </Text>
                        
                        {isSelected && (
                          <View className="mt-2 pt-2 border-t border-gray-300">
                            <Text className="text-gray-600 text-xs">
                              📍 Position: ({Math.round(defect.x)}, {Math.round(defect.y)})
                            </Text>
                            <Text className="text-gray-600 text-xs mt-1">
                              📐 Size: {Math.round(defect.width)} × {Math.round(defect.height)} px
                            </Text>
                            <Text className="text-gray-600 text-xs mt-1">
                              🆔 ID: {defect.detection_id.substring(0, 8)}...
                            </Text>
                          </View>
                        )}
                      </View>
                      
                      <Ionicons 
                        name={isSelected ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color="#9ca3af" 
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View className="px-[6%] py-[8%] items-center">
              <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
              <Text className="text-gray-900 font-semibold text-lg mt-4">
                No Defects Found
              </Text>
              <Text className="text-gray-600 text-center mt-2 px-[10%]">
                The PCB analysis completed successfully with no defects detected.
              </Text>
            </View>
          )}

          {/* Analysis Metadata */}
          {parsedData && (
            <View className="px-[6%] py-[4%] bg-gray-50 mx-[6%] rounded-xl mb-[4%]">
              <Text className="text-gray-700 font-semibold mb-2 text-sm">
                📊 Analysis Details
              </Text>
              <Text className="text-gray-600 text-xs mb-1">
                DeepPCB: {parsedData.deeppcb?.predictions?.predictions?.length || 0} detections
                {parsedData.deeppcb?.predictions?.time && 
                  ` (${(parsedData.deeppcb.predictions.time * 1000).toFixed(0)}ms)`}
              </Text>
              <Text className="text-gray-600 text-xs mb-1">
                HRIPCB: {parsedData.hripcb?.predictions?.predictions?.length || 0} detections
                {parsedData.hripcb?.predictions?.time && 
                  ` (${(parsedData.hripcb.predictions.time * 1000).toFixed(0)}ms)`}
              </Text>
              <Text className="text-gray-600 text-xs">
                Image Size: {originalSize.width} × {originalSize.height} px
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View className="px-[6%] pb-[8%] pt-[4%]">
            <TouchableOpacity 
              onPress={handleExportReport}
              className="bg-purple-600 rounded-xl py-[4%] items-center mb-[3%]"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                📄 Export Report
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAnalyzeAnother}
              className="bg-gray-100 rounded-xl py-[4%] items-center border border-gray-300"
              activeOpacity={0.8}
            >
              <Text className="text-gray-700 font-semibold text-base">
                📷 Analyze Another PCB
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}