import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventsListComponent } from './events-list.component';
import { of } from 'rxjs';
import { EventsService } from '../services/api_serivices/events/events.service';

describe('EventsListComponent', () => {
  let component: EventsListComponent;
  let fixture: ComponentFixture<EventsListComponent>;
  let eventsService: EventsService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: EventsService, useValue: { 
          getEvents: () => of({ data: [] }), 
          deleteEvent: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListComponent);
    component = fixture.componentInstance;
    eventsService = TestBed.inject(EventsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on initialization', () => {
    spyOn(eventsService, 'getEvents').and.returnValue(of({ data: [] }));
    component.loadEvents();
    expect(eventsService.getEvents).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete event', () => {
    spyOn(eventsService, 'deleteEvent').and.returnValue(of(null));
    component.delete(1);
    expect(eventsService.deleteEvent).toHaveBeenCalledWith(1);
  });

});