import { Routes } from '@angular/router';
import { Messages } from './features/messages/messages';
import { Profile } from './features/profile/profile';
import { authGuard, notAuthGuard } from './guards/auth.guard';
import { Login } from './login/login';
import { Role } from './models/role';
import { SignUp } from './sign-up/sign-up';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
    canActivate: [notAuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUp,
    title: 'Sign Up',
    canActivate: [notAuthGuard],
  },
  {
    path: 'messages',
    title: 'Messages',
    component: Messages,
    canActivate: [authGuard(Role.User)],
  },
  {
    path: 'profile',
    title: 'Profile',
    component: Profile,
    canActivate: [authGuard(Role.User)],
  },
];
