import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Role } from '../models/role';
import { AppSettingsService } from './appsettings.service';

export interface User {
  id: string;
  email: string;
  isEmailConfirmed: boolean;
  roles: Role[];
  name: string;
  profileSlug: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private appSettings = inject(AppSettingsService);

  private _user = signal<User | null>(null);

  user = this._user.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(this.appSettings.env.apiUrl + '/auth/login', user)
      .pipe(switchMap(() => this.loadUserInfo()));
  }

  register(user: { email: string; password: string }) {
    return this.http
      .post(this.appSettings.env.apiUrl + '/auth/register', user)
      .pipe(switchMap(() => this.sendEmailConfirmationLink(user.email)));
  }

  logout() {
    return this.http.post(this.appSettings.env.apiUrl + '/auth/logout', {}).pipe(
      tap(() => {
        this._user.set(null);
      }),
    );
  }

  loadUserInfo() {
    return this.http
      .get<ApiResponse<User>>(this.appSettings.env.apiUrl + '/auth/user-info')
      .pipe(tap((res) => this._user.set(res?.data)));
  }

  hasRoles(...roles: Role[] | string[]) {
    return this._user()?.roles.some((role) => roles.includes(role)) ?? false;
  }

  sendEmailConfirmationLink(email: string) {
    return this.http.post(this.appSettings.env.apiUrl + '/auth/email-verification', { email });
  }

  confirmEmail(email: string, token: string) {
    return this.http.get(this.appSettings.env.apiUrl + '/auth/email-verification', {
      params: { email, token },
    });
  }

  sendPasswordResetLink(email: string) {
    return this.http.post(this.appSettings.env.apiUrl + '/auth/forget-password', { email });
  }

  resetPassword(email: string, token: string, password: string) {
    return this.http.post(this.appSettings.env.apiUrl + '/auth/reset-password', {
      token,
      password,
      email,
    });
  }
}
