import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaHistoriaComponent } from './carga-historia.component';

describe('CargaHistoriaComponent', () => {
  let component: CargaHistoriaComponent;
  let fixture: ComponentFixture<CargaHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaHistoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
