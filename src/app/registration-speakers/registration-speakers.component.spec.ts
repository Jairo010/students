import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationSpeakersComponent } from './registration-speakers.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ISpeakers } from '../interfaces/speakers.interface';
import { of, throwError } from 'rxjs';

describe('RegistrationSpeakersComponent', () => {
  let component: RegistrationSpeakersComponent;
  let fixture: ComponentFixture<RegistrationSpeakersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.speakers.value).toEqual({
      card: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      biography: '',
      topic: ''
    });
  });

  it('should show an alert for invalid form', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
  });

  it('should submit the form with valid values', () => {
    // Arrange
    const speakerData: ISpeakers = {
      card: '123456789',
      name: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      phone: '123456789',
      biography: 'Biography',
      topic: 'Topic'
    };
    spyOn(window, 'alert');
    spyOn(component.speakersService, 'createSpeaker').and.returnValue(of(speakerData));
    spyOn(component.router, 'navigate');
  
    // Act
    component.speakers.setValue(speakerData);
    component.onSubmit();
  
    // Assert
    expect(window.alert).toHaveBeenCalledWith('Ponente registrado con éxito');
    expect(component.router.navigate).toHaveBeenCalledWith(['/speakers-list']);
  });
  
  it('should show an alert for invalid form', () => {
    // Arrange
    spyOn(window, 'alert');
  
    // Act
    component.onSubmit();
  
    // Assert
    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
  });
  
  it('should show an alert for error while registering speaker', () => {
    // Arrange
    const speakerData: ISpeakers = {
      card: '123456789',
      name: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      phone: '123456789',
      biography: 'Biography',
      topic: 'Topic'
    };
    spyOn(window, 'alert');
    spyOn(component.speakersService, 'createSpeaker').and.returnValue(throwError({}));
  
    // Act
    component.speakers.setValue(speakerData);
    component.onSubmit();
  
    // Assert
    expect(window.alert).toHaveBeenCalledWith('Error al registrar ponente');
  });
});
