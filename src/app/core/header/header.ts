import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthDirective } from '../../directives/auth.directive';
import { CloseDropdownDirective } from '../../directives/close-dropdown';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AuthDirective, CloseDropdownDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    });
  }
}
