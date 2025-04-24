import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  users: any[] = [];

  usersFromAPI: any[] = [];

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadUsers();

    this.loadUsersFromAPI();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadUsersFromAPI() {
    this.apiService.getUserFromAPI().subscribe((data) => {
      console.log('Received data', data);
      this.usersFromAPI = data;
    });
  }

  submitUserForm() {
    const user = {
      name: this.userForm.controls.name.value,
      email: this.userForm.controls.email.value,
    };
    console.log('submitted user', user);
    this.apiService.postUserToAPI(user).subscribe((_) => {
      this.userForm.reset();
      this.toastr.success('User saved successfully.');
      this.loadUsersFromAPI();
    });
  }
}
