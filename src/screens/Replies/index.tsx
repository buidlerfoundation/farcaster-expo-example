import api from "@/api";
import CastItemV1 from "@/components/CastItem/CastItemV1";
import Spinner from "@/components/Spinner";
import { normalizeAllCasts } from "@/helpers/CastHelpers";
import { ICastV1, RootStackParamList } from "@/models";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";

const Replies = () => {
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, "RepliesScreen">>();
  const hash = useMemo(() => route.params?.hash, [route.params?.hash]);
  const [casts, setCasts] = useState<ICastV1[]>([]);
  useEffect(() => {
    if (hash) {
      setLoading(true);
      api
        .getAllCastsFromHash(hash)
        .then((res) => {
          if (res.success) {
            setCasts(normalizeAllCasts(res.data?.result?.casts || []));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [hash]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={casts[0]?.castReplies}
          keyExtractor={(cast) => cast.hash}
          renderItem={({ item }) => <CastItemV1 cast={item} />}
          ListHeaderComponent={
            <CastItemV1
              cast={casts?.[0]}
              style={{ borderBottomWidth: 1, borderColor: "#f3f3f3" }}
              header
            />
          }
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, backgroundColor: "#f3f3f3", width: "100%" }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default memo(Replies);
