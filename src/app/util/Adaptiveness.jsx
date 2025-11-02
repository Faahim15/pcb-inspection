import { Dimensions } from "react-native";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const { width, height } = Dimensions.get("window");

export const scale = (size) => (width / BASE_WIDTH) * size;
export const verticalScale = (size) => (height / BASE_HEIGHT) * size;
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// 👇 Default export as an object
export default {
  scale,
  verticalScale,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
