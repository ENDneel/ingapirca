import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaAdministradorComponent } from './noticia-administrador.component';

describe('NoticiaAdministradorComponent', () => {
  let component: NoticiaAdministradorComponent;
  let fixture: ComponentFixture<NoticiaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiaAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
