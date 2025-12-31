import { Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { signalForm } from '../../../helpers/signal-form';
import { GetMyAccountResponse } from '../../../models/Requests/get-account-by-slug';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-change-page-slug-form',
  imports: [Field],
  templateUrl: './change-page-slug-form.html',
  styleUrl: './change-page-slug-form.css',
})
export class ChangePageSlugForm {
  route = inject(ActivatedRoute);
  account: GetMyAccountResponse = this.route.parent?.snapshot.data['account'];

  form = signalForm({
    profileSlug: this.account.profileSlug,
  });

  userSettings = inject(UserSettingsService);

  origin = location.origin;

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.userSettings.changeProfileSlug(this.form().value()).subscribe();
  }
}
