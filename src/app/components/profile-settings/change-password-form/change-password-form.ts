import { Component, inject } from '@angular/core';
import { Field, required, validate } from '@angular/forms/signals';
import { signalForm } from '../../../helpers/signal-form';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-change-password-form',
  imports: [Field],
  templateUrl: './change-password-form.html',
  styleUrl: './change-password-form.css',
})
export class ChangePasswordForm {
  form = signalForm(
    {
      password: '',
      confirmPassword: '',
    },
    (schema) => {
      required(schema.password);
      required(schema.confirmPassword);

      // Cross-field validator
      validate(schema.confirmPassword, ({ value, valueOf }) => {
        const passwordValue = valueOf(schema.password);
        const confirmValue = value();

        if (confirmValue && confirmValue !== passwordValue) {
          return { kind: 'passwordMismatch', message: 'Passwords do not match' };
        }
        return null; // Valid
      });
    },
  );

  userSettings = inject(UserSettingsService);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    var value = this.form().value();
    this.userSettings.changePassword({ password: value.password }).subscribe();
  }
}
