import React, { memo, useCallback, useMemo } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import { INFTsEthereum } from "@/models";

interface INFTItem {
  item: INFTsEthereum;
  onPress: (item: INFTsEthereum) => void;
}

const NFTItem = ({ item, onPress }: INFTItem) => {
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
        source={{ uri: item.tokenNfts.contentValue.image?.small }}
      >
        <View style={styles.mask}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.tokenNfts.metaData.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(NFTItem);
