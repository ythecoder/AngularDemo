import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import { Newsfeed } from './newsfeed.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ParentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isActive: boolean = true;

  newsfeeds: Newsfeed[] = [
    {
      username: 'hari',
      profilePicture: '/images/img1.png',
      postedOn: new Date('2025-02-20 7:57 AM'),
      content:
        'I’m happy to share that I’m starting a new position as Software Engineer at Infinite',
    },
    {
      username: 'shyam',
      profilePicture: '/images/img2.png',
      postedOn: new Date('2025-02-21 6:30 AM'),
      content:
        'I’m happy to share that I’m starting a new position as Associate Team Lead at InfoDevelopers Pvt. Ltd.!',
    },
    {
      username: 'madan',
      profilePicture: '/images/img3.png',
      postedOn: new Date('2025-02-22 5:30 AM'),
      content:
        'Here are some essential software architectural patterns that are crucial for...',
    },
  ];

  toggleIsActive() {
    this.isActive = !this.isActive;
  }

  postNewsfeed(post: HTMLTextAreaElement) {
    const postText = post.value.trim();
    if (postText) {
      this.newsfeeds.unshift({
        username: 'testuser',
        profilePicture: '/images/img3.png',
        postedOn: new Date('2025-02-22 5:30 AM'),
        content: postText,
      });
      post.value = '';
    }
  }
}
