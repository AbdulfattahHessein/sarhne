import { signal } from '@angular/core';
import { FieldTree, form, FormOptions, SchemaOrSchemaFn } from '@angular/forms/signals';

export function signalForm<TModel>(model: TModel): FieldTree<TModel, string | number>;
export function signalForm<TModel>(
  model: TModel,
  schema: SchemaOrSchemaFn<TModel>,
  options: FormOptions,
): FieldTree<TModel>;
export function signalForm<TModel>(
  model: TModel,
  schemaOrOptions: SchemaOrSchemaFn<TModel> | FormOptions,
): FieldTree<TModel, string | number>;
export function signalForm<TModel>(
  model: TModel,
  second?: SchemaOrSchemaFn<TModel> | FormOptions,
  third?: FormOptions,
): FieldTree<TModel> | FieldTree<TModel, string | number> {
  if (third !== undefined) {
    return form<TModel>(signal(model), second as SchemaOrSchemaFn<TModel>, third);
  } else if (second !== undefined) {
    return form<TModel>(signal(model), second);
  } else {
    return form<TModel>(signal(model));
  }
}

export type ModelOf<T> = T extends FieldTree<infer M, any> ? M : never;

export function value<T>(value: T): T {
  return value;
}
