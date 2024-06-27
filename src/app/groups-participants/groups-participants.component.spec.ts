import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsParticipantsComponent } from './groups-participants.component';

describe('GroupsParticipantsComponent', () => {
  let component: GroupsParticipantsComponent;
  let fixture: ComponentFixture<GroupsParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsParticipantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupsParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
