import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileId?: string | null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    console.log('ID from route (snapshot):', this.profileId);
  }
}
