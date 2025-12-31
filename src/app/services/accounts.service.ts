import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Account, GetMyAccountResponse } from '../models/Requests/get-account-by-slug';
import { AppSettingsService } from './appsettings.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  apiUrl = inject(AppSettingsService).apiUrl;
  http = inject(HttpClient);

  getAccountInfoBySlug(slug: string) {
    return this.http.get<ApiResponse<Account>>(`${this.apiUrl}/accounts/${slug}`);
  }

  getMyAccount() {
    return this.http.get<ApiResponse<GetMyAccountResponse>>(`${this.apiUrl}/accounts/me`);
  }
}
