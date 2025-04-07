import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMealsComponent } from './our-meals.component';

describe('OurMealsComponent', () => {
  let component: OurMealsComponent;
  let fixture: ComponentFixture<OurMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurMealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
