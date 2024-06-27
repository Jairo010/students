import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsEditFormComponent } from './participants-edit-form.component';

describe('ParticipantsEditFormComponent', () => {
  let component: ParticipantsEditFormComponent;
  let fixture: ComponentFixture<ParticipantsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantsEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipantsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
