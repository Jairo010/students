import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEditFormComponent, IEvents } from './event-edit-form.component';
import { EventsService } from '../services/api_serivices/events/events.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('EventEditFormComponent', () => {
  let component: EventEditFormComponent;
  let fixture: ComponentFixture<EventEditFormComponent>;
  let mockDialogRef: MatDialogRef<EventEditFormComponent>;
  let mockEventsService: EventsService;

  const mockData: IEvents = {
    id: '1',
    name: 'Test Event',
    description: 'Test Description',
    startDate: new Date(),
    endDate: new Date(),
    typeEvent: 'Test Type',
    status: 'activo'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockEventsService = jasmine.createSpyObj(['updateEvent', 'createEvent']);

    (mockEventsService.updateEvent as jasmine.Spy).and.returnValue(of({})); // Retornar Observable vacío
    (mockEventsService.createEvent as jasmine.Spy).and.returnValue(of({})); // Retornar Observable vacío

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, EventEditFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: EventsService, useValue: mockEventsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data', () => {
    expect(component.group.value).toEqual(mockData);
  });

  it('should call updateEvent when form is valid and event has id', () => {
    const updatedEvent = { ...mockData, name: 'Updated Event' };
    component.group.setValue(updatedEvent);
    component.save();
    expect(mockEventsService.updateEvent).toHaveBeenCalledWith(updatedEvent);
    expect(mockDialogRef.close).toHaveBeenCalledWith(updatedEvent);
  });

  it('should close the form', () => {
    component.closeForm();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});