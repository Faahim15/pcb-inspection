import { View } from "react-native";

function ProgressSlider({ activeIndex = 0 }) {
  return (
    <View className="flex-row  gap-[2.07%] justify-center  items-center">
      {[0, 1, 2].map((index) => (
        <View
          style={{
            shadowColor: "#ffffff",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25, // #00000040 = 25% opacity
            shadowRadius: 2,
            elevation: 4, // For Android
          }}
          key={index}
          className={
            index === activeIndex
              ? " w-[50px] h-[6px]  rounded-[79px] bg-[#fff]"
              : " w-[25px] h-[6px]  rounded-[79px] bg-[#060605]"
          }
        />
      ))}
    </View>
  );
}
export default ProgressSlider;
