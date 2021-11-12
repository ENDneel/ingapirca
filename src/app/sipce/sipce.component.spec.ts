import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipceComponent } from './sipce.component';

describe('SipceComponent', () => {
  let component: SipceComponent;
  let fixture: ComponentFixture<SipceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SipceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SipceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
