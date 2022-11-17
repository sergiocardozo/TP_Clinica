import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoSolicitadoComponent } from './turno-solicitado.component';

describe('TurnoSolicitadoComponent', () => {
  let component: TurnoSolicitadoComponent;
  let fixture: ComponentFixture<TurnoSolicitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoSolicitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoSolicitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
