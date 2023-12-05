import { View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import api from "@/api";
import CastItem from "@/components/CastItem";
import { ICast, RootStackParamList } from "@/models";
import Spinner from "@/components/Spinner";

const FeedsByPoapsHolders = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FeedsByPoapsScreen">>();
  const eventId = useMemo(() => route.params?.eventId, [route.params?.eventId]);
  const title = useMemo(() => route.params?.title, [route.params?.title]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [saveFids, setSaveFids] = useState("");
  const [feeds, setFeeds] = useState<ICast[]>([]);
  const [next, setNext] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fetchFeeds = useCallback(async () => {
    if (!eventId) return;
    setLoading(true);
    const holders = await api.getFidsWhoOwnPOAP(eventId);
    const fids = holders.data?.Poaps?.Poap?.map(
      (item) => item.owner.socials?.[0]?.profileTokenId || ""
    )
      .filter((item) => !!item)
      .join(",");
    setSaveFids(fids);
    const res = await api.getUserFeeds(fids);
    if (res.success) {
      setFeeds(res.data?.casts);
      setNext(res.data?.next?.cursor);
    }
    setLoading(false);
  }, [eventId]);
  useEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
  }, [navigation, title]);
  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);
  const onEndReached = useCallback(() => {
    if (!next || loadMore || !saveFids) return;
    setLoadMore(true);
    api
      .getUserFeeds(saveFids, next)
      .then((res) => {
        if (res.success) {
          setFeeds((current) => [...current, ...(res.data?.casts || [])]);
          setNext(res.data?.next?.cursor);
        }
      })
      .finally(() => {
        setLoadMore(false);
      });
  }, [loadMore, next, saveFids]);
  const onItemPress = useCallback(
    (cast: ICast) => {
      navigation.navigate("RepliesScreen", { hash: cast.thread_hash });
    },
    [navigation]
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={feeds}
          keyExtractor={(cast) => cast.hash}
          renderItem={({ item }) => (
            <CastItem cast={item} onPress={onItemPress} />
          )}
          initialNumToRender={10}
          onEndReached={onEndReached}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, backgroundColor: "#242424", width: "100%" }}
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
      )}
    </SafeAreaView>
  );
};

export default memo(FeedsByPoapsHolders);
