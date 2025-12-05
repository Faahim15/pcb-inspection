// shadows.js
import { StyleSheet, Platform } from "react-native";
import { scale, SCREEN_WIDTH } from "./Adaptiveness";

const XStyle = StyleSheet.create({
  lightShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  shadowBox: {
    backgroundColor: "white",
    borderRadius: scale(8),
    padding: scale(16),

    // iOS shadow
    ...Platform.select({
      ios: {
        shadowColor: "#D4E0EB",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4, // Approximate match for shadow depth
      },
    }),
  },
  borderStyle: {
    width: SCREEN_WIDTH,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
});
export default XStyle;
