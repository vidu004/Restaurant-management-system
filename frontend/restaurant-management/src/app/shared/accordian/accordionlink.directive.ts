import { 
  Directive, 
  HostBinding, 
  Input, 
  OnInit, 
  OnDestroy, 
  inject, 
  Optional 
} from '@angular/core';
import { AccordionDirective } from './accordian.directive';

@Directive({
  selector: '[appAccordionLink]',
  standalone: true
})
export class AccordionlinkDirective implements OnInit, OnDestroy {
  @Input() group: any;

  @HostBinding('class.selected')
  @Input()
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (value) {
      this.nav?.closeOtherLinks(this);
    }
  }

  private _selected = false;
  private nav = inject(AccordionDirective, { optional: true });

  constructor() {}

  ngOnInit(): void {
    this.nav?.addLink(this);
  }

  ngOnDestroy(): void {
    this.nav?.removeGroup(this);
  }

  toggle(): void {
    this.selected = !this.selected;
  }
}
