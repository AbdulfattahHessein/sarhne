import { DatePipe } from '@angular/common';
import { Component, inject, model, output } from '@angular/core';
import { Message } from '../../../models/Requests/get-all-message';
import { UserMessagesService } from '../../../services/user-messages.service';

@Component({
  selector: 'app-message-details',
  imports: [DatePipe],
  templateUrl: './message-details.html',
  styleUrl: './message-details.css',
})
export class MessageDetails {
  message = model.required<Message>();

  messagesService = inject(UserMessagesService);
  deleteMessage() {
    this.messagesService.deleteMessage(this.message().id).subscribe(() => {
      this.deleted.emit(this.message().id);
    });
  }

  toggleFav() {
    this.messagesService.toggleFav(this.message().id, !this.message().isFav).subscribe(() => {
      this.message.update((m) => ({
        ...m,
        isFav: !m.isFav,
      }));
    });
  }

  deleted = output<string>();
}
