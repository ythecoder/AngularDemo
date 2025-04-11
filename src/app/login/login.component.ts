import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private session: SessionService) {}

  login() {
    if (this.username && this.password) {
      this.session.setUser(this.username);
      this.router.navigate(['/']);
    } else {
      alert('Please enter username and password');
    }
  }

  localStorageSet() {
    this.session.setLocalStorage(20);
  }

  removeLocalStorage() {
    this.session.removeLocalStorage('age');
  }
}
