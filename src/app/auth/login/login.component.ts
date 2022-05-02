import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['desarrollo@prueba.com', [Validators.required, Validators.email]],
    password: ['pruebas001', [Validators.required, Validators.minLength(6)]],
  });
  error: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.authService.usuario) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(email, password).then(res => {
        if (res.error) {
          this.error =
            res.error.message === 'EMAIL_NOT_FOUND'
              ? 'El correo electrónico no existe'
              : 'La contraseña es incorrecta';
          return;
        }
        this.router.navigateByUrl('/dashboard');
      });
    }
  }

  getError(inputName: string) {
    return (
      this.loginForm.get(inputName)?.errors &&
      this.loginForm.get(inputName)?.touched
    );
  }
}
