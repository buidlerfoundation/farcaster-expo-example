import React, { memo } from "react";
import { View, Text } from "react-native";

const Replies = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Replies Screen</Text>
    </View>
  );
};

export default memo(Replies);
