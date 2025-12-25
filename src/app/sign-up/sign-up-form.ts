import { apply, email, pattern, required, schema } from '@angular/forms/signals';
import { signalForm } from '../helpers/signal-form';

const emailSchema = schema<string>((e) => {
  required(e, { message: 'Email is required.', when: () => true });

  email(e, { message: 'Please enter a valid email address.' });
});

const passwordSchema = schema<string>((p) => {
  required(p, { message: 'Password is required.' });

  pattern(p, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter and one number.',
  });
});

export function createSignUpForm() {
  return signalForm(
    {
      email: '',
      password: '',
    },
    (s) => {
      apply(s.email, emailSchema);

      apply(s.password, passwordSchema);
    },
  );
}
