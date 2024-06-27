import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationprojectsComponent } from './registrationprojects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';

describe('RegistrationprojectsComponent', () => {
  let component: RegistrationprojectsComponent;
  let fixture: ComponentFixture<RegistrationprojectsComponent>;
  let httpMock: HttpTestingController;
  let projectService: ProjectsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationprojectsComponent , ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [ProjectsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationprojectsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectsService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be an Object when all inpust are fill', () => {
    const name = component.register.controls['name'];
    const description = component.register.controls['description'];
    const startDate= component.register.controls['startDate'];
    const endDate= component.register.controls['endDate'];
    const idClub= component.register.controls['club'];

    name.setValue('Accounts');
    description.setValue('Cash');
    startDate.setValue('12/12/2024');
    endDate.setValue('12/12/2026');
    idClub.setValue('1');

    const mockUser: any = { 
      data: {},
      error: false,
      status: 200
    };
      component.onSubmit();
    
      const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/projects'); // Ajusta la URL según tu API
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
  
      expect(component.project).toEqual(mockUser);
  });
});