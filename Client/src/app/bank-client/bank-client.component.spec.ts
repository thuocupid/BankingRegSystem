import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankClientComponent } from './bank-client.component';

describe('BankClientComponent', () => {
  let component: BankClientComponent;
  let fixture: ComponentFixture<BankClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
