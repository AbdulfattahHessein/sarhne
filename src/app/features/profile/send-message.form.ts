import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';

export type SendMessageRequest = {
  content: string;
  receiverId: string;
  sendAnonymously: boolean;
};

const formModel = signal<SendMessageRequest>({
  content: '',
  receiverId: '',
  sendAnonymously: false,
});

export function createSendMessageForm() {
  return form(formModel);
}
