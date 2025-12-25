import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Role } from '../models/role';
import { envService } from './env.service';

export interface User {
  id: string;
  email: string;
  isEmailConfirmed: boolean;
  roles: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private env = inject(envService);

  private _user = signal<User | null>(null);

  user = this._user.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(this.env.env.apiUrl + '/auth/login', user)
      .pipe(switchMap(() => this.loadUserInfo()));
  }

  register(user: { email: string; password: string }) {
    return this.http.post(this.env.env.apiUrl + '/auth/register', user);
  }

  logout() {
    return this.http.post(this.env.env.apiUrl + '/auth/logout', {}).pipe(
      tap(() => {
        this._user.set(null);
      }),
    );
  }

  loadUserInfo() {
    return this.http
      .get<{ data: User } | null>(this.env.env.apiUrl + '/auth/user-info')
      .pipe(tap((res) => this._user.set(res ? res.data : null)));
  }

  hasRoles(...roles: Role[] | string[]) {
    return this._user()?.roles.some((role) => roles.includes(role));
  }
}
