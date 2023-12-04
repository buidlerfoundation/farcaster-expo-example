export type RootStackParamList = {
  FeedsScreen: undefined;
  RepliesScreen?: { hash: string };
};

export interface BaseDataApi<T> {
  success: boolean;
  data?: T;
  statusCode: number;
  message?: string;
}

export interface IUser {
  object?: string;
  fid: number;
  custody_address?: string;
  username?: string;
  display_name?: string;
  pfp_url?: string;
  profile?: {
    bio?: {
      text?: string;
      mentioned_profiles?: IUser[];
    };
  };
  follower_count?: number;
  following_count?: number;
  verifications: string[];
  active_status?: string;
}

export interface IEmbed {
  url?: string;
}

export interface IReaction {
  fid: number;
  fname?: string;
}

export interface IUserV1 {
  fid: number;
  custodyAddress?: string;
  username?: string;
  displayName?: string;
  pfp?: {
    url?: string;
  };
  profile?: {
    bio?: {
      text?: string;
      mentionedProfiles: IUserV1[];
    };
  };
  followerCount?: number;
  followingCount?: number;
  verifications: string[];
  activeStatus: string;
}

export interface ICastV1 {
  hash?: string;
  parentHash?: string;
  parentUrl?: string;
  threadHash?: string;
  parentAuthor?: {
    fid?: string;
  };
  author: IUserV1;
  text?: string;
  timestamp?: string;
  embeds?: [
    {
      url?: string;
    },
  ];
  mentionedProfiles?: IUserV1[];
  reactions?: {
    count?: number;
    fids?: number[];
    fnames?: string[];
  };
  recasts?: {
    count?: number;
    fids?: number[];
  };
  recasters?: string[];
  viewerContext?: {
    liked?: boolean;
    recasted?: boolean;
  };
  replies?: {
    count?: number;
  };
}

export interface ICast {
  object?: string;
  hash?: string;
  thread_hash?: string;
  parent_hash?: string;
  parent_url?: string;
  parent_author?: {
    fid?: string;
  };
  author?: IUser;
  text?: string;
  timestamp?: string;
  embeds?: IEmbed[];
  reactions: {
    likes?: IReaction[];
    recasts?: IReaction[];
  };
  replies?: {
    count?: number;
  };
  mentioned_profiles?: IUser[];
}

export interface IFeedApiData {
  casts: ICast[];
  next: {
    cursor: string;
  };
}
