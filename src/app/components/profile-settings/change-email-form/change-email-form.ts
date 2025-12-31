import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signalForm } from '../../../helpers/signal-form';
import { GetMyAccountResponse } from '../../../models/Requests/get-account-by-slug';
import { UserSettingsService } from '../../../services/user-settings.service';
import { Field } from "@angular/forms/signals";

@Component({
  selector: 'app-change-email-form',
  imports: [Field],
  templateUrl: './change-email-form.html',
  styleUrl: './change-email-form.css',
})
export class ChangeEmailForm {
  route = inject(ActivatedRoute);
  account: GetMyAccountResponse = this.route.parent?.snapshot.data['account'];

  form = signalForm({
    email: this.account.email,
  });

  userSettings = inject(UserSettingsService);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.userSettings.changeEmail(this.form().value()).subscribe();
  }
}
