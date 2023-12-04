import { ICastV1, IFeedApiData } from "@/models";
import ApiCaller from "./ApiCaller";

export const getTrendingFeeds = (cursor?: string) => {
  const q = new URLSearchParams({
    feed_type: "filter",
    filter_type: "global_trending",
    with_recasts: "true",
    limit: "25",
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
