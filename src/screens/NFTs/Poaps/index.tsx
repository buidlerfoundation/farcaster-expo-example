import api from "@/api";
import PoapItem from "@/components/PoapItem";
import Spinner from "@/components/Spinner";
import { IPoapEvent, RootStackParamList } from "@/models";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

const Poaps = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    {
      poapEvent: IPoapEvent;
    }[]
  >([]);
  const onItemPress = useCallback(
    (item: IPoapEvent) => {
      navigation.navigate("FeedsByPoapsScreen", {
        eventId: item.eventId,
        title: `${item.eventName} holders`,
      });
    },
    [navigation]
  );
  useEffect(() => {
    setLoading(true);
    api
      .getAirStackPoaps()
      .then((res) => {
        if (res.success) {
          setData(res.data.Poaps.Poap);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={data}
          style={{ padding: 7.5 }}
          keyExtractor={(item) => item.poapEvent.eventId}
          numColumns={2}
          renderItem={({ item }) => (
            <PoapItem item={item.poapEvent} onPress={onItemPress} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default memo(Poaps);
