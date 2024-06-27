import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { TasksListComponent } from './tasks-list.component';
import { ITasks } from '../interfaces/tasks.interface';
import { TasksService } from '../services/api_serivices/tasks/tasks.service';
import { SharedModule } from '../shared/shared.module';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let mockDialog: MatDialog;
  let mockTasksService: jasmine.SpyObj<TasksService>;
  let tasksService: TasksService;
  let dialog: MatDialog;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TasksListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: TasksService, useValue: { 
          getTasks: () => of({ data: [] }), 
          deleteTask: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    spyOn(tasksService, 'getTasks').and.returnValue(of({ data: [] }));
    component.loadTasks();
    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete task', () => {
    spyOn(tasksService, 'deleteTask').and.returnValue(of(null));
    component.delete('1');
    expect(tasksService.deleteTask).toHaveBeenCalledWith('1');
  });

});
