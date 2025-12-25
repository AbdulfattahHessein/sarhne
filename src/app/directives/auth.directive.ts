import {
  Directive,
  effect,
  inject,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[auth]',
})
export class AuthDirective implements OnInit, OnChanges {
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      this.updateView();
    });
  }

  @Input('auth') roles?: Role | Role[] | string | string[];

  ngOnInit(): void {
    this.updateView();
  }

  ngOnChanges(): void {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();

    if (!this.authService.isLoggedIn()) {
      return;
    }

    // If no roles provided → show for any logged-in user
    if (!this.roles || this.roles.length === 0) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return;
    }

    const normalizedRoles = Array.isArray(this.roles) ? this.roles : [this.roles];

    if (this.authService.hasRoles(...normalizedRoles)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
