import { signalForm } from '../../helpers/signal-form';

export type SendMessageRequest = {
  content: string;
  receiverId: string;
  sendAnonymously: boolean;
};

export function createSendMessageForm() {
  return signalForm<SendMessageRequest>({
    content: '',
    receiverId: '',
    sendAnonymously: false,
  });
}
