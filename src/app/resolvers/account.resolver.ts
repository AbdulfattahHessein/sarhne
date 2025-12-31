import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { Account, GetMyAccountResponse } from '../models/Requests/get-account-by-slug';
import { AccountsService } from '../services/accounts.service';

export const accountResolver: ResolveFn<Account> = (route, state) => {
  const slug: string = route.params['slug'];

  const accounts = inject(AccountsService);

  return accounts.getAccountInfoBySlug(slug).pipe(map((r) => r.data!));
};

export const getMyAccountResolver: ResolveFn<GetMyAccountResponse> = (route, state) => {
  const accounts = inject(AccountsService);

  return accounts.getMyAccount().pipe(map((r) => r.data!));
};
