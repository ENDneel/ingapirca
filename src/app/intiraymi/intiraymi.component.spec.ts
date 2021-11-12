import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntiraymiComponent } from './intiraymi.component';

describe('IntiraymiComponent', () => {
  let component: IntiraymiComponent;
  let fixture: ComponentFixture<IntiraymiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntiraymiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntiraymiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
