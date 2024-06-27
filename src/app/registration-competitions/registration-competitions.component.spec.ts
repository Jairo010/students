import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationCompetitionsComponent } from './registration-competitions.component';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { of, throwError } from 'rxjs';

describe('RegistrationCompetitionsComponent', () => {
  let component: RegistrationCompetitionsComponent;
  let fixture: ComponentFixture<RegistrationCompetitionsComponent>;
  let mockRouter: Router;
  let mockCompetitionService: jasmine.SpyObj<CompetitionsService>; // Asegura que mockCompetitionService sea de tipo SpyObj

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCompetitionService = jasmine.createSpyObj('CompetitionsService', ['createCompetition']);

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, RegistrationCompetitionsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CompetitionsService, useValue: mockCompetitionService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createCompetition and navigate to /competitions-list on successful registration', () => {
    const mockCompetitionData = {
      type: 'Test Type',
      numParticipants: 10,
      price: 50,
      status: 'Active'
    };

    mockCompetitionService.createCompetition.and.returnValue(of(mockCompetitionData));

    // Set form values
    component.register.patchValue({
      type: mockCompetitionData.type,
      numParticipants: mockCompetitionData.numParticipants,
      price: mockCompetitionData.price,
      status: mockCompetitionData.status
    });

    spyOn(window, 'alert');

    component.onSignUp();

    expect(mockCompetitionService.createCompetition).toHaveBeenCalled(); // Verifica que se haya llamado
    expect(mockCompetitionService.createCompetition).toHaveBeenCalledWith(mockCompetitionData); // Verifica los argumentos pasados
    expect(window.alert).toHaveBeenCalledWith('Competicion registrada exitosamente'); // Verifica que se haya mostrado la alerta
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/competitions-list']); // Verifica que se haya navegado correctamente
  });

  it('should handle error on createCompetition', () => {
    const mockError = new Error('Internal Server Error');
    mockCompetitionService.createCompetition.and.returnValue(throwError(mockError));

    // Set form values
    component.register.patchValue({
      type: 'Test Type',
      numParticipants: 10,
      price: 50,
      status: 'Active'
    });

    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.onSignUp();

    expect(mockCompetitionService.createCompetition).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al registrar la competicion');
    expect(console.error).toHaveBeenCalledWith('Error al registrar', mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled(); // No debería navegar en caso de error
  });

  it('should display alert on invalid form submission', () => {
    spyOn(window, 'alert');

    component.onSignUp();

    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
    expect(mockCompetitionService.createCompetition).not.toHaveBeenCalled(); // No debería llamar al servicio
    expect(mockRouter.navigate).not.toHaveBeenCalled(); // No debería navegar
  });
});
