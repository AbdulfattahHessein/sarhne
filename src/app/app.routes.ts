import { Routes } from '@angular/router';
import { ProfileSettings } from './components/profile-settings/profile-settings';
import { Messages } from './features/messages/messages';
import { Profile } from './features/profile/profile';
import { authGuard, notAuthGuard } from './guards/auth.guard';
import { Login } from './login/login';
import { Role } from './models/role';
import { accountResolver, getMyAccountResolver } from './resolvers/account.resolver';
import { SignUp } from './sign-up/sign-up';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'messages',
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
    path: 'u/:slug',
    component: Profile,
    resolve: {
      account: accountResolver,
    },
  },

  {
    path: 'settings',
    resolve: {
      account: getMyAccountResolver,
    },
    children: [
      {
        path: '',
        component: ProfileSettings,
        title: 'Settings',
        canActivate: [authGuard(Role.User)],
      },
    ],
  },
];
