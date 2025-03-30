import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirseComponent } from './inscribirse.component';

describe('InscribirseComponent', () => {
  let component: InscribirseComponent;
  let fixture: ComponentFixture<InscribirseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscribirseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribirseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
