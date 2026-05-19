export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  username: string;
  // dob: string;
  dp: string;
  title: string;
};

export type TPost = {
  id: string;
  content: string;
  attachment: { url: string }[];
  createdAt: string;
  updatedAt: string;
  postedBy: TUser;
  likes: TUser[];
  comments: TComment[];
};
export type TComment = {
  id: string;
  comment: string;
  date: string;
  user: TUser;
};

