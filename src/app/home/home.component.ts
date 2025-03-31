import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import { Newsfeed } from './newsfeed.interface';
import { NewsfeedService } from './newsfeed.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ParentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isActive: boolean = true;
  newsfeeds: Newsfeed[] = [];

  //observable creation
  myObservable = new Observable((observer) => {
    observer.next('Hello');
    observer.next('World');
    observer.complete(); // Marks the observable as complete
  });

  //myNumbers observable
  // myNumbers = new Observable<number>((observer) => {
  //   observer.next(1);
  //   observer.next(2);
  //   observer.next(3);
  //   observer.next(4);
  //   observer.next(5);
  //   observer.complete();
  // });

  constructor(private newsfeedService: NewsfeedService) {}

  ngOnInit() {
    this.newsfeeds = this.newsfeedService.newsfeeds;

    //observable Use
    this.myObservable.subscribe((value) => console.log('Data emitted:', value));

    // this.myNumbers
    //   // .pipe(map((value) => value * 2))
    //   .subscribe((value) => console.log('Number emitted:', value));
  }

  toggleIsActive() {
    this.isActive = !this.isActive;
  }

  postNewsfeed(post: HTMLTextAreaElement) {
    const postText = post.value.trim();
    const newsfeedsCount = this.newsfeeds.length;
    if (postText) {
      this.newsfeeds.unshift({
        id: newsfeedsCount + 1,
        username: 'testuser',
        profilePicture: '/images/img3.png',
        postedOn: new Date('2025-02-22 5:30 AM'),
        content: postText,
        isLiked: false,
        likesCount: 0,
        comments: [],
      });
      post.value = '';
    }
  }

  toggleLike(postId: number) {
    this.newsfeedService.toggleLike(postId);
  }

  addComment(postId: number, commentText: string) {
    if (!commentText.trim()) return;
    this.newsfeedService.addComment(postId, commentText);
  }
}
