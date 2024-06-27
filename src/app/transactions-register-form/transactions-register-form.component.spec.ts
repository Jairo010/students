import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsRegisterFormComponent } from './transactions-register-form.component';

describe('TransactionsRegisterFormComponent', () => {
  let component: TransactionsRegisterFormComponent;
  let fixture: ComponentFixture<TransactionsRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsRegisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
