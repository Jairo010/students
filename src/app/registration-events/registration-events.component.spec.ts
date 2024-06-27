import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationEventsComponent } from './registration-events.component';
import { EventsService } from '../services/api_serivices/events/events.service';
import { of, throwError } from 'rxjs';

describe('RegistrationEventsComponent', () => {
  let component: RegistrationEventsComponent;
  let fixture: ComponentFixture<RegistrationEventsComponent>;
  let mockRouter: Router;
  let mockEventsService: jasmine.SpyObj<EventsService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockEventsService = jasmine.createSpyObj('EventsService', ['createEvent']);

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, RegistrationEventsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: EventsService, useValue: mockEventsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createEvent and navigate to /eventos on successful registration', () => {
    const mockEventData = {
      name: 'Test Event',
      description: 'Test Description',
      startDate: new Date(),
      endDate: new Date(),
      typeEvent: 'Test Type'
    };

    //mockEventsService.createEvent.and.returnValue(of(mockEventData));

    // Set form values
    component.eventos.patchValue({
      name: mockEventData.name,
      description: mockEventData.description,
      startDate: mockEventData.startDate,
      endDate: mockEventData.endDate,
      typeEvent: mockEventData.typeEvent
    });

    spyOn(window, 'alert');

    component.onSubmit();

    expect(mockEventsService.createEvent).toHaveBeenCalled();
    //expect(mockEventsService.createEvent).toHaveBeenCalledWith(mockEventData);
    expect(window.alert).toHaveBeenCalledWith('Evento registrado exitosamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/eventos']);
  });

  it('should handle error on createEvent', () => {
    const mockError = new Error('Internal Server Error');
    mockEventsService.createEvent.and.returnValue(throwError(mockError));

    // Set form values
    component.eventos.patchValue({
      name: 'Test Event',
      description: 'Test Description',
      startDate: new Date(),
      endDate: new Date(),
      typeEvent: 'Test Type'
    });

    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.onSubmit();

    expect(mockEventsService.createEvent).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al registrar el evento');
    expect(console.error).toHaveBeenCalledWith('Error al registrar evento', mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /eventos on closeForm()', () => {
    component.closeForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/eventos']);
  });

  it('should display alert on invalid form submission', () => {
    spyOn(window, 'alert');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
    expect(mockEventsService.createEvent).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

});
