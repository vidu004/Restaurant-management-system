import {
  Directive,
  AfterContentChecked,
  OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AccordionlinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordion]',
  standalone: true
})
export class AccordionDirective implements AfterContentChecked, OnDestroy {
  private destroy$ = new Subject<void>();
  protected navlinks: Array<AccordionlinkDirective> = [];

  constructor(private router: Router) {}

  closeOtherLinks(selectedLink: AccordionlinkDirective): void {
    this.navlinks.forEach((link: AccordionlinkDirective) => {
      if (link !== selectedLink) {
        link.selected = false;
      }
    });
  }

  addLink(link: AccordionlinkDirective): void {
    this.navlinks.push(link);
  }

  removeGroup(link: AccordionlinkDirective): void {
    this.navlinks = this.navlinks.filter(l => l !== link);
  }

  checkOpenLinks(): void {
    const routeUrl = this.router.url;
    this.navlinks.forEach((link: AccordionlinkDirective) => {
      if (link.group) {
        const currentUrlSegments = routeUrl.split('/');
        if (currentUrlSegments.includes(link.group)) {
          link.selected = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }

  ngAfterContentChecked(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.checkOpenLinks());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}