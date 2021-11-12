import { TestBed } from '@angular/core/testing';

import { ReservaAdministradorService } from './reserva-administrador.service';

describe('ReservaAdministradorService', () => {
  let service: ReservaAdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaAdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
