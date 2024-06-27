import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationParticipantsComponent } from './registration-participants.component';

describe('RegistrationParticipantsComponent', () => {
  let component: RegistrationParticipantsComponent;
  let fixture: ComponentFixture<RegistrationParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationParticipantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
