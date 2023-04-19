import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalitaComponent } from './localita.component';

describe('LocalitaComponent', () => {
  let component: LocalitaComponent;
  let fixture: ComponentFixture<LocalitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
