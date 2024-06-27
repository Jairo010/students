import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelectorDialogComponent } from './member-selector-dialog.component';

describe('MemberSelectorDialogComponent', () => {
  let component: MemberSelectorDialogComponent;
  let fixture: ComponentFixture<MemberSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
