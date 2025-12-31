import { Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { signalForm } from '../../../helpers/signal-form';
import { GetMyAccountResponse } from '../../../models/Requests/get-account-by-slug';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-change-personal-info-form',
  imports: [Field],
  templateUrl: './change-personal-info-form.html',
  styleUrl: './change-personal-info-form.css',
})
export class ChangePersonalInfoForm {
  route = inject(ActivatedRoute);
  account: GetMyAccountResponse = this.route.parent?.snapshot.data['account'];

  form = signalForm({
    name: this.account.name,
    bio: this.account.bio,
    gender: this.account.gender,
  });

  userSettings = inject(UserSettingsService);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    console.log(this.form().value());

    this.userSettings.changePersonalInfo(this.form().value()).subscribe();
  }
}
