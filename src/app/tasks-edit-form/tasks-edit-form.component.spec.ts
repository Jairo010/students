import { IProjects } from './../interfaces/projects.interface';
import { TestBed } from '@angular/core/testing';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { TasksEditFormComponent } from './tasks-edit-form.component';
import { of, throwError } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TasksEditFormComponent', () => {
  let component: TasksEditFormComponent;
  let projectsService: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TasksEditFormComponent, // Importa el componente standalone aquí
        HttpClientTestingModule // Importa HttpClientTestingModule para proporcionar HttpClient
      ],
      providers: [
        ProjectsService,
        { provide: MatDialogRef, useValue: {} }, // Provee un mock para MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provee un valor para MAT_DIALOG_DATA
      ]
    });
    component = TestBed.createComponent(TasksEditFormComponent).componentInstance;
    projectsService = TestBed.inject(ProjectsService);
  });

  it('should fetch clubs data', () => {
    const mockResponse: IProjects[] = [{
      name: 'Club 1',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      idClub: '1'
    }, {
      name: 'Club 2',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      idClub: ''
    }, {
      name: 'Club 3',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      idClub: ''
    }];
    spyOn(projectsService, 'getProjectsCombo').and.returnValue(of(mockResponse));

    component.getClubs();

    expect(component.projectData).toEqual(mockResponse);
  });

  it('should handle error when fetching clubs data', () => {
    const mockError = 'Error fetching clubs data';
    spyOn(projectsService, 'getProjectsCombo').and.returnValue(throwError(mockError));

    spyOn(console, 'error');  // Añade esto para espiar en console.error

    component.getClubs();

    expect(console.error).toHaveBeenCalledWith('Error al obtener los clubs', mockError);
  });
});
