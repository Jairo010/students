import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ProjectListComponent } from './project-list.component';
import { ProjectsService } from '../services/api_serivices/projects/projects.service';
import { of } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectsService: ProjectsService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [
        { provide: ProjectsService, useValue: { getProjects: () => of({ data: [] }), deleteProject: () => of(null) } },
        { provide: MatDialog, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    projectsService = TestBed.inject(ProjectsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on initialization', () => {
    const getProjectsSpy = spyOn(projectsService, 'getProjects').and.returnValue(of({ data: [] }));

    component.ngOnInit();

    expect(getProjectsSpy).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.totalRecords).toBe(0);
  });

  it('should delete project', () => {
    const deleteProjectSpy = spyOn(projectsService, 'deleteProject').and.returnValue(of({}));

    component.delete('1');

    expect(deleteProjectSpy).toHaveBeenCalledWith('1');
  });

});