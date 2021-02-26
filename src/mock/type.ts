export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

declare interface GlobalDataProps {
  column: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
