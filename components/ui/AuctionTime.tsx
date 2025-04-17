import React, { useEffect, useState } from "react";
import { View } from "react-native";
import StyledText from "./StyledText";
import { getTimeLeft } from "@/utils/get-time-left";

interface AuctionTimeProps {
  endTime: string;
  isSingle?: boolean;
}

const AuctionTime: React.FC<AuctionTimeProps> = ({ endTime, isSingle = false }) => {
  const [time, setTime] = useState(getTimeLeft(endTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  let formattedTime = "";

  if (isSingle) {
    const totalHours = time.days * 24 + time.hours;
    formattedTime = `${totalHours} год ${time.minutes} хв ${time.seconds} сек`;
  } else {
    const pad = (num: number) => num < 10 ? `0${num}` : num.toString();
    formattedTime = `${pad(time.days)}:${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
  }

  return (
    <View>
      <StyledText
        style={{
          textShadowColor: "rgba(0,0,0,0.75)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {formattedTime}
      </StyledText>
    </View>
  );
};

export default AuctionTime;
