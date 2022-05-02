import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClietComponent } from './form-cliet.component';

describe('FormClietComponent', () => {
  let component: FormClietComponent;
  let fixture: ComponentFixture<FormClietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
