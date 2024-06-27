import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationGroupsComponent } from './registration-groups.component';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { of, throwError } from 'rxjs';

describe('RegistrationGroupsComponent', () => {
  let component: RegistrationGroupsComponent;
  let fixture: ComponentFixture<RegistrationGroupsComponent>;
  let mockRouter: Router;
  let mockGroupsService: jasmine.SpyObj<GroupsService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockGroupsService = jasmine.createSpyObj('GroupsService', ['createGroup']);

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, RegistrationGroupsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupsService, useValue: mockGroupsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createGroup and navigate to /group-list on successful registration', () => {
    const mockGroupData = {
      name: 'Test Group',
      description: 'Test Description',
      status: true
    };

    mockGroupsService.createGroup.and.returnValue(of(mockGroupData));

    // Set form values
    component.grupos.patchValue({
      name: mockGroupData.name,
      description: mockGroupData.description,
      status: 'true'
    });

    spyOn(window, 'alert');

    component.onSubmit();

    expect(mockGroupsService.createGroup).toHaveBeenCalled();
    expect(mockGroupsService.createGroup).toHaveBeenCalledWith(mockGroupData);
    expect(window.alert).toHaveBeenCalledWith('Grupo registrado exitosamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/group-list']);
  });

  it('should handle error on createGroup', () => {
    const mockError = new Error('Internal Server Error');
    mockGroupsService.createGroup.and.returnValue(throwError(mockError));

    // Set form values
    component.grupos.patchValue({
      name: 'Test Group',
      description: 'Test Description',
      status: 'true'
    });

    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.onSubmit();

    expect(mockGroupsService.createGroup).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al registrar el grupo');
    expect(console.error).toHaveBeenCalledWith('Error al registrar grupo', mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /group-list on successful form submission', () => {
    component.onSubmit();
    expect(mockGroupsService.createGroup).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should display alert on invalid form submission', () => {
    spyOn(window, 'alert');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
    expect(mockGroupsService.createGroup).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

});
