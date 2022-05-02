import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewAccoutComponent } from './form-new-accout.component';

describe('FormNewAccoutComponent', () => {
  let component: FormNewAccoutComponent;
  let fixture: ComponentFixture<FormNewAccoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNewAccoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewAccoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
