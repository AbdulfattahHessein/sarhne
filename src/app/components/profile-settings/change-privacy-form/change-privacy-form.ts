import { Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { signalForm } from '../../../helpers/signal-form';
import { GetMyAccountResponse } from '../../../models/Requests/get-account-by-slug';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-change-privacy-form',
  imports: [Field],
  templateUrl: './change-privacy-form.html',
  styleUrl: './change-privacy-form.css',
})
export class ChangePrivacyForm {
  route = inject(ActivatedRoute);
  account: GetMyAccountResponse = this.route.parent?.snapshot.data['account'];

  form = signalForm({
    allowAnonymous: this.account.settings.allowAnonymous,
    allowImages: this.account.settings.allowImages,
    allowMessages: this.account.settings.allowMessages,
  });

  userSettings = inject(UserSettingsService);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.userSettings.changePrivacy(this.form().value()).subscribe();
  }
}
