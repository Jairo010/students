import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectEditFormComponent, IProjectData } from './project-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';
import { of } from 'rxjs';

describe('ProjectEditFormComponent', () => {
  let component: ProjectEditFormComponent;
  let fixture: ComponentFixture<ProjectEditFormComponent>;
  let mockDialogRef: MatDialogRef<ProjectEditFormComponent>;
  let mockData: IProjectData;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockData = {
      id: '1',
      name: 'Test Project',
      description: 'Test Description',
      dateStart: '2022-01-01',
      dateEnd: '2022-01-31',
      Club: '1'
    };

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, ProjectEditFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: ClubsService, useValue: { getClubsCombo: () => of([]) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load clubs', () => {
    spyOn(component, 'loadForm');
    spyOn(component, 'getClubs');

    component.ngOnInit();

    expect(component.loadForm).toHaveBeenCalled();
    expect(component.getClubs).toHaveBeenCalled();
  });

  it('should close the form', () => {
    component.closeForm();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should save the form', () => {
    const record = {
      id: '1',
      name: 'Test Project',
      description: 'Test Description',
      startDate: '2022-01-01',
      endDate: '2022-01-31',
      idClub: '1'
    };

    component.group.setValue(record);
    component.save();

    expect(mockDialogRef.close).toHaveBeenCalledWith(record);
  });
});