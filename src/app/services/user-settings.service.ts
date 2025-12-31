import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { AppSettingsService } from './appsettings.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  apiUrl = inject(AppSettingsService).apiUrl;
  http = inject(HttpClient);

  changePersonalInfo(request: { name: string; gender: 'Male' | 'Female'; bio: string }) {
    return this.http.patch<ApiResponse>(
      `${this.apiUrl}/user/settings/personal-information`,
      request,
    );
  }

  changeEmail(request: { email: string }) {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/settings/email`, request);
  }

  changePassword(request: { password: string }) {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/settings/password`, request);
  }

  changeAvatar(request: { avatar: string }) {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/settings/avatar`, request);
  }

  changePhoneNumber(request: { phoneNumber: string }) {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/settings/phone-number`, request);
  }
  changeProfileSlug(request: { profileSlug: string }) {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/settings/profile-slug`, request);
  }
}
