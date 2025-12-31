import { Component, inject, input, OnInit } from '@angular/core';
import { Field, submit } from '@angular/forms/signals';
import { Title } from '@angular/platform-browser';
import { Account } from '../../models/Requests/get-account-by-slug';
import { UserMessagesService } from '../../services/user-messages.service';
import { createSendMessageForm } from './send-message.form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  imports: [Field],
})
export class Profile implements OnInit {
  account = input.required<Account>();

  title = inject(Title);

  messagesService = inject(UserMessagesService);

  form = createSendMessageForm();

  ngOnInit(): void {
    this.title.setTitle(this.account().name);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.form.receiverId().value.set(this.account().id);

    submit(this.form, async () => {
      this.messagesService.sendMessage(this.form().value()).subscribe(() => {
        this.form().reset();
        console.log(this.form().submitting());
      });
    });
  }
}
