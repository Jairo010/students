import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationParticipantCompetitionComponent } from './registration-participant-competition.component';

describe('RegistrationParticipantCompetitionComponent', () => {
  let component: RegistrationParticipantCompetitionComponent;
  let fixture: ComponentFixture<RegistrationParticipantCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationParticipantCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationParticipantCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
