import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCloseDropdown]',
  standalone: true,
})
export class CloseDropdownDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('click')
  onClick(): void {
    const activeElement = this.el.nativeElement.ownerDocument.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
