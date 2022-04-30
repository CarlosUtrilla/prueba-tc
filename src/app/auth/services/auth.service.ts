import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginToken, User } from '../interfaces/interfaces';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User

  constructor(private http: HttpClient) {
    const user = sessionStorage.getItem("user");
    if (user) {
      this._user = JSON.parse(user);
    }
   }

  get usuario() {
    return { ...this._user }
  }
  login(email: string, password: string) {
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI'
    const body = {
      email,
      password,
      returnSecureToken: true
    }
    return this.http.post<LoginToken>(url, body)
      .pipe(
        tap(resp => {
          if (resp.idToken) {
            const user = {
              email: resp.email,
              uid: resp.localId,
              token: resp.idToken
            }
            this._user = user;
            sessionStorage.setItem("user", JSON.stringify(user));
          }
        }),
        map(resp => resp),
        catchError(err => of({ ...err.error }) )
      )
  }
  validateUser() {
    return of(this._user?.token && this._user?.uid ? true : false);
  }
}
