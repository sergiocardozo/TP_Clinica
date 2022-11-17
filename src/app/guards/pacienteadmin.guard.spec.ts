import { TestBed } from '@angular/core/testing';

import { PacienteadminGuard } from './pacienteadmin.guard';

describe('PacienteadminGuard', () => {
  let guard: PacienteadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
