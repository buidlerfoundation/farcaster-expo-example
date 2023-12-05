import api from "@/api";
import NFTItem from "@/components/NFTItem";
import Spinner from "@/components/Spinner";
import { normalizeNFTCollection } from "@/helpers/NFTHelpers";
import { INFTsEthereum, RootStackParamList } from "@/models";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

const Ethereum = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<INFTsEthereum[]>([]);
  const onItemPress = useCallback(
    (item: INFTsEthereum) => {
      navigation.navigate("FeedsByNFTScreen", {
        address: item.tokenAddress,
        title: `${item.tokenNfts.metaData.name} holders`,
      });
    },
    [navigation]
  );
  useEffect(() => {
    setLoading(true);
    api
      .getAirStackNFTEthereum()
      .then((res) => {
        if (res.success) {
          setData(res.data.Ethereum.TokenBalance);
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
          data={normalizeNFTCollection(data)}
          style={{ padding: 7.5 }}
          keyExtractor={(item) => item.tokenAddress + item.tokenId}
          numColumns={2}
          renderItem={({ item }) => (
            <NFTItem item={item} onPress={onItemPress} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default memo(Ethereum);
