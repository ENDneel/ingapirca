import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacComponent } from './capac.component';

describe('CapacComponent', () => {
  let component: CapacComponent;
  let fixture: ComponentFixture<CapacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
