import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { concatMap, forkJoin } from 'rxjs';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AppSettingsService } from './services/appsettings.service';
import { AuthService } from './services/auth.service';
import { LangsService } from './services/langs.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(initializeApp),
  ],
};

function initializeApp() {
  const langService = inject(LangsService);

  const appSettings = inject(AppSettingsService);

  const auth = inject(AuthService);

  return appSettings
    .loadAppSettings()
    .pipe(concatMap(() => forkJoin([langService.setupLangs(), auth.loadUserInfo()])));
}
