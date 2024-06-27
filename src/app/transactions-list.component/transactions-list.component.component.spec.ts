import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListComponentComponent } from './transactions-list.component.component';

describe('TransactionsListComponentComponent', () => {
  let component: TransactionsListComponentComponent;
  let fixture: ComponentFixture<TransactionsListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
