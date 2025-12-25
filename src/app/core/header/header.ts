import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthDirective } from '../../directives/auth.directive';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AuthDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(AuthService);
  router = inject(Router);

  Role = Role;

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    });
  }
}
