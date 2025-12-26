import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class Profile {
  auth = inject(AuthService);
}
