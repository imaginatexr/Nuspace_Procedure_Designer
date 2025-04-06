import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { User } from '../_models';
import { API_URL } from './global';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) {
   // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    const defaultUser: User = {
      id: 0, username: '', firstName: '',
      password: '',
      lastName: '',
      token: ''
    }; // Adjust according to your User type
const currentUser = localStorage.getItem('currentUser');
this.currentUserSubject = new BehaviorSubject<User>(currentUser ? JSON.parse(currentUser) : defaultUser);

this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userName: string,password: string){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json');

    const body = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('Encrypt', 'false');
      
   // return this.http.post<any>(API_URL+'api/IsUser', { userName, password })
   return this.http.post<any>(API_URL+'api/IsUser', body.toString(), { headers: headers })
    .pipe(map(user => {
      // store user details jwt token in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    //remove user from localStorage
    const defaultUser: User = {
      id: 0, username: '', firstName: '',
      password: '',
      lastName: '',
      token: ''
    }; 
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(defaultUser);
  }
}