import { ICast } from "@/models";
import React, { memo } from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import moment from "moment";
import RenderHTML from "../RenderHTML";
import { normalizeContentCast } from "@/helpers/CastHelpers";
import IconLike from "../SVG/IconLike";
import IconReply from "../SVG/IconReply";
import IconRecast from "../SVG/IconRecast";

interface ICastItem {
  cast: ICast;
}

const CastItem = ({ cast }: ICastItem) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default memo(CastItem);
