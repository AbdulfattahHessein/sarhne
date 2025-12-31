import { Component } from '@angular/core';
import { ChangeEmailForm } from './change-email-form/change-email-form';
import { ChangePageSlugForm } from './change-page-slug-form/change-page-slug-form';
import { ChangePasswordForm } from './change-password-form/change-password-form';
import { ChangePersonalInfoForm } from './change-personal-info-form/change-personal-info-form';
import { ChangePrivacyForm } from "./change-privacy-form/change-privacy-form";

@Component({
  selector: 'app-profile-settings',
  imports: [ChangePersonalInfoForm, ChangeEmailForm, ChangePasswordForm, ChangePageSlugForm, ChangePrivacyForm],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css',
})
export class ProfileSettings {}
