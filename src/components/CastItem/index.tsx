import { ICast } from "@/models";
import React, { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import moment from "moment";
import RenderHTML from "../RenderHTML";
import { normalizeContentCast } from "@/helpers/CastHelpers";
import IconLike from "../SVG/IconLike";
import IconReply from "../SVG/IconReply";
import IconRecast from "../SVG/IconRecast";

interface ICastItem {
  cast: ICast;
  onPress?: (cast: ICast) => void;
}

const CastItem = ({ cast, onPress }: ICastItem) => {
  const onItemPress = useCallback(() => {
    onPress?.(cast);
  }, [cast, onPress]);
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!onPress}
      onPress={onItemPress}
    >
      <Image source={{ uri: cast.author.pfp_url }} style={styles.avatar} />
      <View style={styles.contentWrap}>
        <View style={styles.nameWrap}>
          <Text style={styles.name}>{cast.author.display_name}</Text>
          <Text style={styles.username}>
            @{cast.author.username} • {moment(cast.timestamp).fromNow(true)}
          </Text>
        </View>
        <RenderHTML html={normalizeContentCast(cast)} />
        <View style={styles.reactions}>
          <View style={styles.reactionItem}>
            <IconLike />
            <Text style={styles.reactionCount}>
              {cast.reactions.likes?.length}
            </Text>
          </View>
          <View style={styles.reactionItem}>
            <IconReply />
            <Text style={styles.reactionCount}>{cast.replies?.count}</Text>
          </View>
          <View style={styles.reactionItem}>
            <IconRecast />
            <Text style={styles.reactionCount}>
              {cast.reactions.recasts?.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CastItem);
