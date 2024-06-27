import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistrationTasksComponent } from './resgistration-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksService } from '../services/api_serivices/tasks/tasks.service';

describe('ResgistrationTasksComponent', () => {
  let component: ResgistrationTasksComponent;
  let fixture: ComponentFixture<ResgistrationTasksComponent>;
  let httpMock: HttpTestingController;
  let taskService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgistrationTasksComponent , ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [TasksService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResgistrationTasksComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('form should be an Object when all inpust are complete', () => {
    const name = component.register.controls['name'];
    const description = component.register.controls['description'];
    const limitDate= component.register.controls['limitDate'];
    const state= component.register.controls['state'];
    const evidence= component.register.controls['evidence'];
    const idProject= component.register.controls['idProject'];

    name.setValue('Make form');
    description.setValue('make form responsive');
    limitDate.setValue('12/12/2024');
    state.setValue('Activa');
    evidence.setValue('Hola');
    idProject.setValue('1');

    const mockUser: any = { 
      data: {},
      error: false,
      status: 200
    };
      component.onSubmit();
    
      const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/tasks'); // Ajusta la URL según tu API
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
  
      expect(component.task).toEqual(mockUser);
  });

  it('form should be an Object when inpust are incomplete', () => {
    const name = component.register.controls['name'];
    const description = component.register.controls['description'];
    const limitDate= component.register.controls['limitDate'];
    const state= component.register.controls['state'];
    const evidence= component.register.controls['evidence'];
    const idProject= component.register.controls['idProject'];

    name.setValue('Make form');
    description.setValue('make form responsive');
    limitDate.setValue('12/12/2024');
    state.setValue('');
    evidence.setValue('Hola');
    idProject.setValue('1');

    const mockUser: any = { 
      data: {},
      error: false,
      status: 200
    };
      component.onSubmit();
    
      //const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/tasks'); // Ajusta la URL según tu API
      //expect(req.request.method).toBe('POST');
      //req.flush(mockUser);
  
      expect(component.register.valid).toBeFalsy;
  });

  it('Should be an objeto when update a task', () => {
    const name = component.register.controls['name'];
    const description = component.register.controls['description'];
    const limitDate= component.register.controls['limitDate'];
    const state= component.register.controls['state'];
    const evidence= component.register.controls['evidence'];
    const idProject= component.register.controls['idProject'];

    name.setValue('Make form');
    description.setValue('make form responsive');
    limitDate.setValue('12/12/2024');
    state.setValue('');
    evidence.setValue('Hola');
    idProject.setValue('1');

    const mockUser: any = { 
      data: {},
      error: false,
      status: 200
    };
      component.onSubmit();
    
      //const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/tasks'); // Ajusta la URL según tu API
      //expect(req.request.method).toBe('PUT');
      //req.flush(mockUser);
  
      expect(component.register.valid).toBeFalsy;
  });


  it('Should be an message when delete a task', () => {
    const name = component.register.controls['name'];
    const description = component.register.controls['description'];
    const limitDate= component.register.controls['limitDate'];
    const state= component.register.controls['state'];
    const evidence= component.register.controls['evidence'];
    const idProject= component.register.controls['idProject'];

    name.setValue('Make form');
    description.setValue('make form responsive');
    limitDate.setValue('12/12/2024');
    state.setValue('');
    evidence.setValue('Hola');
    idProject.setValue('1');

    const mockUser: any = { 
      data: {},
      error: false,
      status: 200
    };
      component.onSubmit();
    
      //const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/tasks'); // Ajusta la URL según tu API
      //expect(req.request.method).toBe('POST');
      //req.flush(mockUser);
  
      expect(component.register.valid).toBeFalsy;
  });
});