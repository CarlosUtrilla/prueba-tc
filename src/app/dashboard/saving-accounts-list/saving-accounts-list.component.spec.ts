import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingAccountsListComponent } from './saving-accounts-list.component';

describe('SavingAccountsListComponent', () => {
  let component: SavingAccountsListComponent;
  let fixture: ComponentFixture<SavingAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
