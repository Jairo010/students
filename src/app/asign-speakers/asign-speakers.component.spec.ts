import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignSpeakersComponent } from './asign-speakers.component';

describe('AsignSpeakersComponent', () => {
  let component: AsignSpeakersComponent;
  let fixture: ComponentFixture<AsignSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignSpeakersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
