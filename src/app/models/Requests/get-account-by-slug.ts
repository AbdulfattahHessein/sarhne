export interface Account {
  id: string;
  name: string;
  settings: Settings;
}

export interface Settings {
  allowMessages: boolean;
  allowImages: boolean;
  allowAnonymous: boolean;
}

export type Gender = 'Male' | 'Female';

export type GetMyAccountResponse = {
  id: string;
  name: string;
  email: string;
  bio: string;
  phoneNumber: string;
  profileSlug: string;
  gender: Gender;
  settings: Settings;
};
