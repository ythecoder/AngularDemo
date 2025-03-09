import { NewsfeedComment } from './newsfeed-comment.interface';

export interface Newsfeed {
  id: number;
  username: string;
  profilePicture: string;
  postedOn: Date;
  content: string;
  isLiked: boolean;
  likesCount: number;
  comments: NewsfeedComment[];
}
