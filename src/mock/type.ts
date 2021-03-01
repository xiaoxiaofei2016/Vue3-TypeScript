export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface ImageProps {
  url?: string;
  _id?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  columnId: string;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  avatar?: ImageProps;
  column?: number;
}

export interface GlobalErrorProps {
  message?: string;
  status: boolean;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  column: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}
