import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGeneralComponent } from './events-general.component';

describe('EventsGeneralComponent', () => {
  let component: EventsGeneralComponent;
  let fixture: ComponentFixture<EventsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
