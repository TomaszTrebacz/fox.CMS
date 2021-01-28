import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { userRole } from '../enums';
import { AuthService } from '../services/auth/auth.service';

@Directive({
  selector: '[access]',
})
export class AccessDirective {
  constructor(
    private tempRef: TemplateRef<any>,
    private viewCont: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input('access') set access(roles: userRole[]) {
    const role = this.authService.userRole;

    if (role) {
      if (roles.includes(role)) {
        this.viewCont.createEmbeddedView(this.tempRef);
      } else {
        this.viewCont.clear();
      }
    }
  }
}
