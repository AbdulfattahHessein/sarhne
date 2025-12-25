import { Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { createLoginForm } from './login-form';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = createLoginForm();

  auth = inject(AuthService);

  router = inject(Router);

  route = inject(ActivatedRoute);

  onSubmit(event: Event) {
    event.preventDefault();

    this.auth.login(this.loginForm().value()).subscribe(() => {
      const returnUrl = this.route.snapshot.queryParams?.['returnUrl'];

      this.router.navigateByUrl(returnUrl ?? '/');
    });
  }
}
