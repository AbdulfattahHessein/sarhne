import { Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { createSignUpForm } from './sign-up-form';

@Component({
  selector: 'app-sign-up',
  imports: [Field],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signUpForm = createSignUpForm();

  auth = inject(AuthService);

  router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();

    this.auth.register(this.signUpForm().value()).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
