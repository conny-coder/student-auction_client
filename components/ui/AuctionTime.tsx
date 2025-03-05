import { getTimeLeft } from "@/utils/get-time-left";
import { useEffect, useState } from "react";
import { View } from "react-native";
import StyledText from "./StyledText";

const AuctionTime = ({ endTime }: { endTime: string }) => {
  const [time, setTime] = useState(getTimeLeft(endTime));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(endTime)), 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <View>
      <StyledText
        style={{
          textShadowColor: "rgba(0,0,0,0.75)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {time}
      </StyledText>
    </View>
  );
};
export default AuctionTime;
