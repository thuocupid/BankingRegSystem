import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankClientAddEditComponent } from './bank-client-add-edit.component';

describe('BankClientAddEditComponent', () => {
  let component: BankClientAddEditComponent;
  let fixture: ComponentFixture<BankClientAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankClientAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankClientAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
