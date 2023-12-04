import { ICastV1 } from "@/models";
import React, { memo, useCallback, useMemo } from "react";
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import moment from "moment";
import RenderHTML from "../RenderHTML";
import { normalizeContentCastV1 } from "@/helpers/CastHelpers";
import IconLike from "../SVG/IconLike";
import IconReply from "../SVG/IconReply";
import IconRecast from "../SVG/IconRecast";

interface ICastItemV1 {
  cast?: ICastV1;
  style?: StyleProp<ViewStyle>;
  header?: boolean;
}

const CastItemV1 = ({ cast, style, header }: ICastItemV1) => {
  const showReplies = useMemo(
    () => !header && cast?.castReplies?.length > 0,
    [cast?.castReplies?.length, header],
  );
  if (!cast) return null;
  return (
    <View style={[styles.root, style]}>
      <View style={styles.container}>
        <Image source={{ uri: cast.author.pfp?.url }} style={styles.avatar} />
        <View style={styles.contentWrap}>
          <View style={styles.nameWrap}>
            <Text style={styles.name}>{cast.author?.displayName}</Text>
            <Text style={styles.username}>
              @{cast.author.username} • {moment(cast.timestamp).fromNow(true)}
            </Text>
          </View>
          <RenderHTML html={normalizeContentCastV1(cast)} />
          <View style={styles.reactions}>
            <View style={styles.reactionItem}>
              <IconLike />
              <Text style={styles.reactionCount}>{cast.reactions?.count}</Text>
            </View>
            <View style={styles.reactionItem}>
              <IconReply />
              <Text style={styles.reactionCount}>{cast.replies?.count}</Text>
            </View>
            <View style={styles.reactionItem}>
              <IconRecast />
              <Text style={styles.reactionCount}>{cast?.recasts?.count}</Text>
            </View>
          </View>
        </View>
      </View>
      {showReplies && (
        <View style={styles.replies}>
          {cast.castReplies.map((castReply) => (
            <CastItemV1 cast={castReply} key={castReply.hash} />
          ))}
        </View>
      )}
    </View>
  );
};

export default memo(CastItemV1);
