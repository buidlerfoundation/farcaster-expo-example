import React, { memo, useCallback, useMemo } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import { IPoapEvent } from "@/models";

interface IPoapItem {
  item: IPoapEvent;
  onPress: (item: IPoapEvent) => void;
}

const PoapItem = ({ item, onPress }: IPoapItem) => {
  const { width } = useWindowDimensions();
  const itemWidth = useMemo(() => (width - 15) / 2, [width]);
  const onItemPress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  return (
    <TouchableOpacity
      style={{ width: itemWidth, height: itemWidth, padding: 7.5 }}
      onPress={onItemPress}
    >
      <ImageBackground
        style={styles.container}
        source={{ uri: item.contentValue.image?.small }}
      >
        <View style={styles.mask}>
          <Text style={styles.tokenId}>#{item.eventId}</Text>
          <Text style={styles.name} numberOfLines={5} ellipsizeMode="tail">
            {item.eventName}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(PoapItem);
