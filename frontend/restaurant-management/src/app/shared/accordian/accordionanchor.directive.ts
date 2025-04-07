import { Directive, HostListener, inject } from '@angular/core';
import { AccordionlinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordionToggle]',
  standalone: true
})
export class AccordionanchorDirective {
  private navlink = inject(AccordionlinkDirective, { optional: true });

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    this.navlink?.toggle();
  }
}
