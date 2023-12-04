import { ICastV1, IFeedApiData, INFTsEthereum, IPoapEvent } from "@/models";
import ApiCaller from "./ApiCaller";

export const getAirStackPoaps = () => {
  const query = `
  query MyQuery {
    Poaps(
      input: {filter: {owner: {_eq: "fc_fname:vitalik.eth"}}, blockchain: ALL, limit: 20}
    ) {
      Poap {
        poapEvent {
          eventName
          eventId
          eventURL
          isVirtualEvent
          city
          contentValue {
            image {
              small
            }
          }
        }
      }
      pageInfo {
        nextCursor
      }
    }
  }
  `;
  return ApiCaller.post<{
    Poaps: {
      Poap: {
        poapEvent: IPoapEvent;
      }[];
      pageInfo: {
        nextCursor: string;
      };
    };
  }>("gql", { operationName: "MyQuery", query }, "https://api.airstack.xyz/");
};

export const getAirStackNFTEthereum = () => {
  const query = `
  query MyQuery {
    Ethereum: TokenBalances(
      input: {filter: {owner: {_eq: "fc_fname:vitalik.eth"}, tokenType: {_in: [ERC721]}}, blockchain: ethereum, limit: 50}
    ) {
      TokenBalance {
        amount
        tokenAddress
        tokenId
        tokenNfts {
          contentValue {
            image {
              small
            }
          }
          metaData {
            name
            description
          }
        }
      }
      pageInfo {
        nextCursor
      }
    }
  }
  `;
  return ApiCaller.post<{
    Ethereum: {
      TokenBalance: INFTsEthereum[];
      pageInfo: {
        nextCursor: string;
      };
    };
  }>("gql", { operationName: "MyQuery", query }, "https://api.airstack.xyz/");
};

export const getFidsWhoOwnNFT = (address: string) => {
  const query = `
  query MyQuery {
    TokenBalances(
      input: {filter: {tokenAddress: {_eq: "${address}"}}, blockchain: ethereum, limit: 200}
    ) {
      TokenBalance {
        owner {
          socials(
            input: {filter: {dappName: {_eq: farcaster}}}
          ) {
            userId
          }
        }
      }
    }
  }
  `;
  return ApiCaller.post<{
    TokenBalances: {
      TokenBalance: { owner: { socials: { userId: string }[] } }[];
    };
  }>("gql", { operationName: "MyQuery", query }, "https://api.airstack.xyz/");
};

export const getFidsWhoOwnPOAP = (eventId: string) => {
  const query = `
  query MyQuery {
    Poaps(input: {filter: {eventId: {_eq: "${eventId}"}}, blockchain: ALL, limit: 200}) {
      Poap {
        owner {
          socials(input: {filter: {dappName: {_eq: farcaster}}}) {
            profileName
            profileTokenId
          }
        }
      }
    }
  }
  `;
  return ApiCaller.post<{
    Poaps: { Poap: { owner: { socials: { profileTokenId: string }[] } }[] };
  }>("gql", { operationName: "MyQuery", query }, "https://api.airstack.xyz/");
};

export const getTrendingFeeds = (cursor?: string, fids?: string) => {
  const q = new URLSearchParams({
    feed_type: "filter",
    filter_type: "global_trending",
    with_recasts: "true",
    limit: "25",
  });
  if (cursor) {
    q.append("cursor", cursor);
  }
  if (fids) {
    q.append("fids", fids);
  }
  return ApiCaller.get<IFeedApiData>(`farcaster/feed?${q}`);
};

export const getUserFeeds = (fids: string, cursor?: string) => {
  const q = new URLSearchParams({
    feed_type: "filter",
    filter_type: "fids",
    with_recasts: "true",
    limit: "25",
    fids,
  });
  if (cursor) {
    q.append("cursor", cursor);
  }
  return ApiCaller.get<IFeedApiData>(`farcaster/feed?${q}`);
};

export const getAllCastsFromHash = (hash: string) => {
  return ApiCaller.get<{ result: { casts: ICastV1[] } }>(
    `farcaster/all-casts-in-thread?threadHash=${hash}&viewerFid=3`,
    "https://api.neynar.com/v1/"
  );
};
