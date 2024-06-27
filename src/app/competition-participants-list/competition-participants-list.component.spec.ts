import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionParticipantsListComponent } from './competition-participants-list.component';

describe('CompetitionParticipantsListComponent', () => {
  let component: CompetitionParticipantsListComponent;
  let fixture: ComponentFixture<CompetitionParticipantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionParticipantsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionParticipantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
