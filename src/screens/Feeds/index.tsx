import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Button,
  Image,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import api from "@/api";
import CastItem from "@/components/CastItem";
import { ICast, RootStackParamList } from "@/models";
import Spinner from "@/components/Spinner";

const Feeds = () => {
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [trendingFeeds, setTrendingFeeds] = useState<ICast[]>([]);
  const [next, setNext] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    const res = await api.getTrendingFeeds();
    if (res.success) {
      setTrendingFeeds(res.data?.casts);
      setNext(res.data?.next?.cursor);
    }
    setLoading(false);
  }, []);
  const goToNFTsTab = useCallback(() => {
    navigation.navigate("NFTsTab");
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={goToNFTsTab} title="Filter" />,
      headerLeft: () => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
          }}
        >
          <Image source={require("@/assets/images/ic_fc.png")} />
        </View>
      ),
    });
  }, [goToNFTsTab, navigation]);
  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);
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
          data={trendingFeeds}
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

export default memo(Feeds);
