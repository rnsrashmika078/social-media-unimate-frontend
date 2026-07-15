export type AuthUserType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  dp: string;
  updated_at: string;
  created_at: string;
  id: number;
};

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