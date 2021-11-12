import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontaniaComponent } from './montania.component';

describe('MontaniaComponent', () => {
  let component: MontaniaComponent;
  let fixture: ComponentFixture<MontaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontaniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
