import { View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import api from "@/api";
import CastItem from "@/components/CastItem";
import { ICast, RootStackParamList } from "@/models";

const Feeds = () => {
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [trendingFeeds, setTrendingFeeds] = useState<ICast[]>([]);
  const [next, setNext] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    setLoading(true);
    api
      .getTrendingFeeds()
      .then((res) => {
        if (res.success) {
          setTrendingFeeds(res.data?.casts);
          setNext(res.data?.next?.cursor);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const onEndReached = useCallback(() => {
    if (!next || loadMore) return;
    setLoadMore(true);
    api
      .getTrendingFeeds(next)
      .then((res) => {
        if (res.success) {
          setTrendingFeeds((current) => [
            ...current,
            ...(res.data?.casts || []),
          ]);
          setNext(res.data?.next?.cursor);
        }
      })
      .finally(() => {
        setLoadMore(false);
      });
  }, [loadMore, next]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={trendingFeeds}
        keyExtractor={(cast) => cast.hash}
        renderItem={({ item }) => <CastItem cast={item} />}
        onEndReached={onEndReached}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: "#f3f3f3", width: "100%" }}
          />
        )}
        ListFooterComponent={
          loadMore ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : undefined
        }
      />
    </SafeAreaView>
  );
};

export default memo(Feeds);
