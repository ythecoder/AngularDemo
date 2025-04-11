import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // 1. Convert the object to JSON before storing
  // const user = {
  //   id: 1,
  //   name: 'Hari Bhandari',
  //   email: 'hari@example.com'
  // };

  // localStorage.setItem('user', JSON.stringify(user));

  //  2. Retrieve and parse it back to an object

  // const userString = localStorage.getItem('user');
  // if (userString) {
  //   const userObject = JSON.parse(userString);
  //   console.log(userObject.name); // "Hari Bhandari"
  // }
  setUser(username: string) {
    sessionStorage.setItem('user', username);
  }

  getUser(): string | null {
    return sessionStorage.getItem('user');
  }

  clear() {
    sessionStorage.clear();
  }

  setLocalStorage(age: number) {
    localStorage.setItem('age', age.toString());
  }

  removeLocalStorage(item: string) {
    localStorage.removeItem(item);
  }
}
