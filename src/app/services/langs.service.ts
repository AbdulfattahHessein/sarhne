import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from './appsettings.service';

@Injectable({
  providedIn: 'root',
})
export class LangsService {
  appSettings = inject(AppSettingsService);

  get langs() {
    return this.appSettings.env.i18n;
  }

  get langsCodes() {
    return this.langs.languages.map((lang) => lang.code);
  }

  private _currentLanguage = '';

  set currentLanguage(lang: string) {
    this._currentLanguage = lang;
    this.switchLanguage();
  }
  get currentLanguage() {
    return this._currentLanguage;
  }

  get storedLang() {
    return localStorage.getItem(this.langs.localeStorageKey);
  }

  get browserLang() {
    return this.translate.getBrowserLang();
  }

  private translate = inject(TranslateService);

  http = inject(HttpClient);

  setupLangs() {
    this.translate.addLangs(this.langsCodes);

    this.translate.setFallbackLang(this.langs.fallback);

    this._currentLanguage = this.langs.default;

    if (this.storedLang && this.langsCodes.includes(this.storedLang)) {
      this._currentLanguage = this.storedLang;
    } else if (this.browserLang && this.langsCodes.includes(this.browserLang)) {
      this._currentLanguage = this.browserLang;
    }

    return this.translate.use(this._currentLanguage);
  }

  switchLanguage(): void {
    this.translate.use(this._currentLanguage);
    localStorage.setItem(this.langs.localeStorageKey, this._currentLanguage);
  }
}
