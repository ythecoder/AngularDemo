import { Injectable } from '@angular/core';
import { Newsfeed } from './newsfeed.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsfeedService {
  newsfeeds: BehaviorSubject<Newsfeed[]> = new BehaviorSubject<Newsfeed[]>([
    {
      id: 1,
      username: 'hari',
      profilePicture: '/images/img1.png',
      postedOn: new Date('2025-02-20 7:57 AM'),
      content:
        'I’m happy to share that I’m starting a new position as Software Engineer at Infinite',
      isLiked: false,
      likesCount: 0,
      comments: [],
    },
    {
      id: 2,
      username: 'shyam',
      profilePicture: '/images/img2.png',
      postedOn: new Date('2025-02-21 6:30 AM'),
      content:
        'I’m happy to share that I’m starting a new position as Associate Team Lead at InfoDevelopers Pvt. Ltd.!',
      isLiked: false,
      likesCount: 0,
      comments: [],
    },
    {
      id: 3,
      username: 'madan',
      profilePicture: '/images/img3.png',
      postedOn: new Date('2025-02-22 5:30 AM'),
      content:
        'Here are some essential software architectural patterns that are crucial for...',
      isLiked: false,
      likesCount: 0,
      comments: [],
    },
  ]);

  constructor() {}

  // toggleLike(postId: number) {
  //   const post = this.newsfeeds.find((p) => p.id === postId);
  //   if (post) {
  //     post.isLiked = !post.isLiked;
  //     post.likesCount += post.isLiked ? 1 : -1;
  //   }
  // }

  toggleLike(postId: number) {
    const newsfeeds = this.newsfeeds.value.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
        };
      }
      return post;
    });

    this.newsfeeds.next(newsfeeds);
  }

  addComment(postId: number, commentText: string) {
    const newsfeeds = this.newsfeeds.value.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              text: commentText,
              createdAt: new Date(),
            },
          ],
        };
      }
      return post;
    });

    this.newsfeeds.next(newsfeeds);
  }
}
