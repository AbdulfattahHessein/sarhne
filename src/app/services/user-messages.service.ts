import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Message, MessagesQueryParams } from '../models/Requests/get-all-message';
import { AppSettingsService } from './appsettings.service';

@Injectable({
  providedIn: 'root',
})
export class UserMessagesService {
  apiUrl = inject(AppSettingsService).apiUrl;
  http = inject(HttpClient);

  GetAllMessages(
    query: MessagesQueryParams = {
      pageNumber: 1,
      pageSize: 100,
      type: 'All',
      isFav: false,
    },
  ) {
    return this.http.get<ApiResponse<Message[]>>(`${this.apiUrl}/user/messages`, {
      params: query,
    });
  }
  sendMessage(message: { content: string; sendAnonymously: boolean; receiverId: string }) {
    return this.http.post<ApiResponse>(`${this.apiUrl}/user/messages`, message);
  }
  deleteMessage(id: string) {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/user/messages/${id}`);
  }
  toggleFav(id: string, isFav: boolean) {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/messages/${id}/favorite`, {
      isFav,
    });
  }
}
