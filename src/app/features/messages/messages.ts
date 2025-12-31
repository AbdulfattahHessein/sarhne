import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserMessagesService } from '../../services/user-messages.service';
import { ProfileCard } from '../profile-card/profile-card';
import { MessagesType } from './../../models/Requests/get-all-message';
import { MessageDetails } from './message-details/message-details';

@Component({
  selector: 'app-messages',
  imports: [ProfileCard, MessageDetails, AsyncPipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  messagesService = inject(UserMessagesService);

  selectedMessageType: MessagesType = 'Received';

  messages$ = this.messagesService.GetAllMessages();

  getMessages(type: MessagesType) {
    this.selectedMessageType = type;
    if (this.selectedMessageType == 'fav') {
      this.messages$ = this.messagesService.GetAllMessages({
        isFav: true,
        pageNumber: 1,
        pageSize: 100,
        type: 'All',
      });
    } else {
      this.messages$ = this.messagesService.GetAllMessages({
        pageNumber: 1,
        pageSize: 100,
        type: this.selectedMessageType,
      });
    }
  }
}
