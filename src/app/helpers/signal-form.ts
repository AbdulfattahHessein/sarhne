import { signal } from '@angular/core';
import { FormOptions, SchemaFn, form } from '@angular/forms/signals';

export function signalForm<T>(
  formData: T,
  schema: SchemaFn<T> = () => {},
  options: FormOptions = {},
) {
  return form<T>(signal(formData), schema, options);
}
