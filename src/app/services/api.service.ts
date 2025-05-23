import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong!'));
  }

  getUserFromAPI(): Observable<any> {
    return this.http.get('http://localhost:5000/api/users');
  }

  postUserToAPI(user: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/users', user);
  }
}
