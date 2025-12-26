import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

export interface I18n {
  default: string;
  fallback: string;
  languages: language[];
  localeStorageKey: string;
}

export interface language {
  code: string;
  name: string;
  flag: string;
}
export interface Environment {
  apiUrl: string;
  i18n: I18n;
}

export enum EnvironmentTypes {
  DEV = 'dev',
  PROD = 'prod',
}
export interface AppSettings {
  environment: EnvironmentTypes;
}

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private _environmentType: EnvironmentTypes = EnvironmentTypes.DEV;

  get isProduction() {
    return this._environmentType === EnvironmentTypes.PROD;
  }

  get isDevelopment() {
    return this._environmentType === EnvironmentTypes.DEV;
  }

  http = inject(HttpClient);

  private GetEnvPath() {
    return `configs/environments/env.${this._environmentType}.json`;
  }

  private _env!: Environment;

  get env() {
    return this._env;
  }

  loadAppSettings() {
    return this.http
      .get<AppSettings>('configs/appsettings.json')
      .pipe(
        switchMap(({ environment }) => {
          this._environmentType = environment;
          return this.http.get<Environment>(this.GetEnvPath());
        }),
      )
      .pipe(tap((env) => (this._env = env)));
  }
}
