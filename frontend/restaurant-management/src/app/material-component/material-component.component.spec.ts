import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialComponentComponent } from './material-component.component';

describe('MaterialComponentComponent', () => {
  let component: MaterialComponentComponent;
  let fixture: ComponentFixture<MaterialComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
