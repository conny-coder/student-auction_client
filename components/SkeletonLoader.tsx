import React, { FC, useEffect, useRef } from "react";
import { Animated, DimensionValue, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {ViewProps} from "react-native/Libraries/Components/View/ViewPropTypes";

interface SkeletonLoaderProps extends ViewProps {
  className?: string;
  width: DimensionValue;
  height: DimensionValue;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  className,
  width,
  height,
  ...props
}) => {
  const containerWidth = 500;
  const stripeWidth = 500;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationLoop = Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animationLoop.start();

    return () => {
      animationLoop.stop();
    };
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-stripeWidth, containerWidth],
  });

  return (
    <View
      {...props}
      style={{width, height}}
      className={`w-full h-32 bg-gray-400 overflow-hidden ${className}`}
    >
      <Animated.View
        className="absolute inset-0"
        style={{ transform: [{ translateX }] }}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.5)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className={`h-full`}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonLoader;
