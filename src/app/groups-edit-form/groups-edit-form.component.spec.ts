import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsEditFormComponent, IGroups } from './groups-edit-form.component';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { of } from 'rxjs';

describe('GroupsEditFormComponent', () => {
  let component: GroupsEditFormComponent;
  let fixture: ComponentFixture<GroupsEditFormComponent>;
  let mockDialogRef: MatDialogRef<GroupsEditFormComponent>;
  let mockGroupsService: jasmine.SpyObj<GroupsService>;

  const mockData: IGroups = {
    id: 1,
    name: 'Test Group',
    description: 'Test Description',
    status: true
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockGroupsService = jasmine.createSpyObj('GroupsService', ['updateGroup', 'createGroup']);
    mockGroupsService.updateGroup.and.returnValue(of(mockData));
    mockGroupsService.createGroup.and.returnValue(of(mockData));

    await TestBed.configureTestingModule({      
      imports: [FormsModule, ReactiveFormsModule, GroupsEditFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: GroupsService, useValue: mockGroupsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data', () => {
    expect(component.groupForm.value).toEqual(mockData);
  });

  it('should call updateGroup when form is valid and group has an id', () => {
    component.groupForm.setValue({ ...mockData, id: 1 });
    component.save();
    expect(mockGroupsService.updateGroup).toHaveBeenCalledWith(component.groupForm.value);
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.groupForm.value);
  });

  it('should call createGroup when form is valid and group does not have an id', () => {
    component.groupForm.setValue({ ...mockData, id: null });
    component.save();
    expect(mockGroupsService.createGroup).toHaveBeenCalledWith(component.groupForm.value);
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.groupForm.value);
  });

  it('should not call updateGroup or createGroup when form is invalid', () => {
    component.groupForm.setValue({ ...mockData, name: null });
    component.save();
    expect(mockGroupsService.updateGroup).not.toHaveBeenCalled();
    expect(mockGroupsService.createGroup).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close the form', () => {
    component.closeForm();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});