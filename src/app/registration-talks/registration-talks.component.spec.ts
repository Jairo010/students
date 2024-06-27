import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationTalksComponent } from './registration-talks.component';
import { TalksService } from '../services/api_serivices/talks/talks.service';
import { of, throwError } from 'rxjs';

describe('RegistrationTalksComponent', () => {
  let component: RegistrationTalksComponent;
  let fixture: ComponentFixture<RegistrationTalksComponent>;
  let mockRouter: Router;
  let mockTalksService: jasmine.SpyObj<TalksService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockTalksService = jasmine.createSpyObj('TalksService', ['createTalk']);

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, RegistrationTalksComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TalksService, useValue: mockTalksService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationTalksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createTalk and navigate to /talks-list on successful registration', () => {
    const mockTalkData = {
      topic: 'Test Topic',
      image: 'test.jpg',
      startDate: new Date(),
      endDate: new Date(),
      status: 'active'
    };

    mockTalksService.createTalk.and.returnValue(of(mockTalkData));

    // Set form values
    component.talks.patchValue({
      topic: mockTalkData.topic,
      image: mockTalkData.image,
      startDate: mockTalkData.startDate,
      endDate: mockTalkData.endDate,
      status: mockTalkData.status
    });

    spyOn(window, 'alert');

    component.onSubmit();

    expect(mockTalksService.createTalk).toHaveBeenCalled();
    expect(mockTalksService.createTalk).toHaveBeenCalledWith(mockTalkData);
    expect(window.alert).toHaveBeenCalledWith('Charla registrada con éxito');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/talks-list']);
  });

  it('should handle error on createTalk', () => {
    const mockError = new Error('Internal Server Error');
    mockTalksService.createTalk.and.returnValue(throwError(mockError));

    // Set form values
    component.talks.patchValue({
      topic: 'Test Topic',
      image: 'test.jpg',
      startDate: new Date(),
      endDate: new Date(),
      status: 'active'
    });

    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.onSubmit();

    expect(mockTalksService.createTalk).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error Charla registrada');
    expect(console.error).toHaveBeenCalledWith('Error al registrar charla', mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /talks-list on successful form submission', () => {
    component.onSubmit();
    expect(mockTalksService.createTalk).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should display alert on invalid form submission', () => {
    spyOn(window, 'alert');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
    expect(mockTalksService.createTalk).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

});
