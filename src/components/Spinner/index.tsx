import React, { memo } from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

export default memo(Spinner);
