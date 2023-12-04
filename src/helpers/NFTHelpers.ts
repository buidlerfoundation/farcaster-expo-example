import { INFTsEthereum } from "@/models";

export const normalizeNFTCollection = (data: INFTsEthereum[]) => {
  return data.reduce<INFTsEthereum[]>((res, value) => {
    const existed = res.find(
      (item) => item.tokenAddress === value.tokenAddress,
    );
    if (existed) return res;
    return [...res, value];
  }, []);
};
