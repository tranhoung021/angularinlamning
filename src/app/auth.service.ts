import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient) { }

  public getUserId = localStorage.getItem('USER_ID')

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/register`, userInfo);
  }

  public getUser():  Observable<User[]> {
    return this.http.get<User[]>(`${this._apiurl}/users/${this.getUserId}`)
  }

  public updateUser(userInfo: User) {
    let getToken = localStorage.getItem('ACCESS_TOKEN')
    let userId = localStorage.getItem('USER_ID')
    return this.http.put(`${this._apiurl}/users/${userId}`, userInfo);
  }
  /* public getuser(userInfo: User) {
    return this.http.get(`${this._apiurl}/users/${userInfo._id}`);
  } */

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
  }



}

