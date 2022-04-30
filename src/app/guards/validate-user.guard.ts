import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router:Router) { }
  canActivate(): Observable<boolean> | boolean  {
    return this.authService.validateUser().pipe(
      tap(isValid => {
        if (!isValid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  canLoad():  Observable<boolean> | boolean {
    return this.authService.validateUser().pipe(
      tap(isValid => {
        if (!isValid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
