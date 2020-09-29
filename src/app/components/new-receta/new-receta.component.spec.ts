import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecetaComponent } from './new-receta.component';

describe('NewRecetaComponent', () => {
  let component: NewRecetaComponent;
  let fixture: ComponentFixture<NewRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
