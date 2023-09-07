import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

import colorHelper from "../../helpers/colorHelper";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const { convertRGBToHex, randomRgbColor } = colorHelper;

type CircleComponentProps = {
  sectionsAmount: number;
};

const CircleComponent: React.FC<CircleComponentProps> = ({
  sectionsAmount,
}) => {
  const svgSize = Dimensions.get("window").width / 2;
  const circleSize = svgSize / 2;
  const circleCircumference = (2 * Math.PI * circleSize) / 2;
  const percentageFilled = (360 / sectionsAmount / 360) * 100; //percentage of chart that's taken by 1 dash

  const rotationAngle = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotationAngle.value}deg` }],
    };
  });

  const EASING = Easing.elastic(0.5);

  const rotation = Gesture.Pan()
    .onUpdate((e) => {
      rotationAngle.value = -e.velocityX;
    })
    .onEnd((e) => {
      const newRotation = (e.velocityX - e.velocityY) / 2;
      // Update the shared value with timing and easing
      rotationAngle.value = withTiming(newRotation, {
        duration: 1000,
        easing: EASING,
      });
    });

  return (
    <GestureDetector gesture={rotation}>
      <Animated.View style={[animatedStyle]}>
        <Svg
          height={svgSize}
          width={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          <Circle r={circleSize} cx={circleSize} cy={circleSize} fill="black" />
          {[...Array(sectionsAmount).keys()].map((val, idx) => {
            return (
              <Circle
                key={idx}
                r={circleSize / 2}
                cx={circleSize}
                cy={circleSize}
                fill="transparent"
                stroke={convertRGBToHex(randomRgbColor())}
                strokeWidth={circleSize}
                strokeDasharray={`${
                  (percentageFilled * circleCircumference) / 100
                } ${circleCircumference}`}
                transform={`rotate(${
                  (360 / sectionsAmount) * idx
                } ${circleSize} ${circleSize})`}
              />
            );
          })}
        </Svg>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({});

export default CircleComponent;
