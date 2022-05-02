import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginToken, User } from '../interfaces/interfaces';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: User;

  constructor(private http: HttpClient) {
    const user = sessionStorage.getItem('user');
    if (user) {
      let u = JSON.parse(user);
      // Se pasa la fecha de expiracion de string a Date
      this._user = {
        ...u,
        expiresIn: new Date(u.expiresIn),
      };
    }
  }

  get usuario() {
    if (this._user.expiresIn > new Date()) {
      return { ...this._user };
    } else {
      sessionStorage.removeItem('user');
      return undefined;
    }
  }
  login(email: string, password: string) {
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI';
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<LoginToken>(url, body).pipe(
      tap(resp => {
        if (resp.idToken) {
          let t = new Date();
          t.setSeconds(t.getSeconds() + Number.parseInt(resp.expiresIn));
          console.log(t);
          const user = {
            email: resp.email,
            uid: resp.localId,
            token: resp.idToken,
            expiresIn: t,
          };
          this._user = user;
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      }),
      map(resp => resp),
      catchError(err => of({ ...err.error }))
    );
  }
  validateUser() {
    return of(this.usuario?.token && this.usuario?.uid ? true : false);
  }

  getToken() {
    if (this.usuario) {
      return this.usuario.token;
    } else {
      return '';
    }
  }
}
