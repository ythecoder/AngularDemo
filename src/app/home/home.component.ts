import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import { Newsfeed } from './newsfeed.interface';
import { NewsfeedService } from './newsfeed.service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ParentComponent, RouterModule],
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
    observer.next('Mars');
    observer.error('Something went wrong');
    observer.next('Moon');
    observer.complete(); // Marks the observable as complete
  });

  // myNumbers observable
  myNumbers = new Observable<number>((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
  });

  source$ = new Observable((observer) => {
    console.log('Observable executed');
    observer.next(Math.random()); // Produces a new random number for each subscriber
  });

  subject$ = new Subject<number>();

  behaviorSubject$ = new BehaviorSubject<number>(0); // Initial value: 0

  //session related
  user: string | null = '';

  constructor(
    private router: Router,
    private session: SessionService,
    private newsfeedService: NewsfeedService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.newsfeedService.newsfeeds.subscribe(
      (newsfeeds) => (this.newsfeeds = newsfeeds)
    );

    //observable Use
    this.myObservable.subscribe(
      (next) => console.log('Data emitted:', next),
      (error) => console.log('Error occured', error),
      () => console.log('Task completed')
    );

    this.myNumbers
      .pipe(map((value) => value * 2))
      .subscribe((value) => console.log('Number emitted:', value));

    this.source$.subscribe((value) =>
      console.log('Subscriber 1 with observable source$:', value)
    );
    this.source$.subscribe((value) =>
      console.log('Subscriber 2 with observable source$:', value)
    );

    this.subject$.subscribe((value) =>
      console.log('Subscriber 1 with subject$:', value)
    );
    this.subject$.subscribe((value) =>
      console.log('Subscriber 2 with subject$:', value)
    );

    console.log('New Value emitted for subject$');

    this.subject$.next(Math.random());

    this.behaviorSubject$.subscribe((value) =>
      console.log('Subscriber 1 (BehaviorSubject):', value)
    );

    this.behaviorSubject$.next(1);
    this.behaviorSubject$.next(2);

    this.behaviorSubject$.subscribe((value) =>
      console.log('Subscriber 2 (BehaviorSubject):', value)
    ); // Will receive the last emitted value (2) immediately

    this.behaviorSubject$.next(3);

    //session related
    this.user = this.session.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
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
    if (!commentText.trim()) {
      this.toastr.warning('Comment add failed, comment is empty.', 'Failed');
      return;
    }
    this.newsfeedService.addComment(postId, commentText);
    this.toastr.success('Comment added successfully.', 'Success');
  }

  //SPREAD OPERATOR--------------------------------
  //  Using Spread Operator with Arrays
  //  Copy an array (avoiding mutation)

  // const numbers = [1, 2, 3];
  // const copyNumbers = [...numbers];

  // console.log(copyNumbers); // [1, 2, 3]
  // Instead of copyNumbers = numbers (which shares the same reference), using [...] creates a new independent array.

  // Merge two arrays

  // const arr1 = [1, 2, 3];
  // const arr2 = [4, 5, 6];

  // const merged = [...arr1, ...arr2];
  // console.log(merged); // [1, 2, 3, 4, 5, 6]
  // The spread operator makes it easy to combine arrays.

  //  Add elements in between

  // const numbers2 = [1, 2, 3];
  // const newNumbers = [0, ...numbers2, 4];

  // console.log(newNumbers); // [0, 1, 2, 3, 4]
  // 2️ Using Spread Operator with Objects
  //  Copy an object

  // const person = { name: "John", age: 30 };
  // const copyPerson = { ...person };

  // console.log(copyPerson); // { name: "John", age: 30 }
  // Like with arrays, this creates a new object instead of just referencing the old one.

  //  Merge two objects

  // const obj1 = { name: "Alice", age: 25 };
  // const obj2 = { city: "New York", country: "USA" };

  // const mergedObj = { ...obj1, ...obj2 };
  // console.log(mergedObj); // { name: "Alice", age: 25, city: "New York", country: "USA" }
  //  Overriding object properties

  // const user = { name: "John", age: 25 };
  // const updatedUser = { ...user, age: 30 };

  // console.log(updatedUser); // { name: "John", age: 30 }
  // The property age is updated because the last spread (...user) is overwritten by age: 30.

  // 3️. Using Spread Operator with Functions (Arguments Expansion)
  //  Pass array elements as function arguments

  // const numbers3 = [10, 20, 30];

  // function sum(a, b, c) {
  //   return a + b + c;
  // }

  // console.log(sum(...numbers3)); // 60
  // Instead of sum(numbers3[0], numbers3[1], numbers3[2]), the spread operator expands the array into separate arguments.
  //-----------------------------------------------------
}
