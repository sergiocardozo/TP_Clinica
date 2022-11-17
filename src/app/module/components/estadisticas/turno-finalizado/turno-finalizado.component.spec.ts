import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoFinalizadoComponent } from './turno-finalizado.component';

describe('TurnoFinalizadoComponent', () => {
  let component: TurnoFinalizadoComponent;
  let fixture: ComponentFixture<TurnoFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoFinalizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
