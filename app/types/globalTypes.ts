export type AuthUserType = {
  firstname: string;
  lastname: string;
  email_verified?: boolean;
  username: string;
  email: string;
  dp: string;
  updated_at: string;
  created_at: string;
  id: number;
  friends?: AuthUserType[];
};

export type TypeOfNotifications =
  | "friend-request-received"
  | "friend-request-sent"
  | "my-post"
  | "others-post"
  | "post-reaction";

export type PostType = {
  id: number;
  user_id: number;
  content: string;
  attachment: string;
  created_at: string;
  updated_at: string;
  user: AuthUserType; // whose posted
  comments_count: number;
  liked_by_users_count: number;
  liked_by_users: {
    id: number;
  }[];
};

export type CommentType = {
  id: number;
  comment: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user: AuthUserType;
};
export type LikeType = {
  id: number;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
};

export type TanstackErrorType = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

// this is the error return types
export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  result: T | null;
  errors: Record<string, string[]> | null;
};

export type PrivateMessageType = {
  message: string;
  sender: AuthUserType;
  userId: number;
};

export type NotificationType = {
  id: number;
  message: string;
  receiver_id: number;
  sender_id: number;
  created_at: string;
  receiver: AuthUserType;
  sender: AuthUserType;
  updated_at?: string;
  is_send_by_me: boolean;
};

export type FriendsType = {
  status: "pending" | "accepted";
  sender_id: number;
  receiver_id: number;
  sender: AuthUserType;
  receiver: AuthUserType;
  is_send_by_me: boolean;
} & AuthUserType;
