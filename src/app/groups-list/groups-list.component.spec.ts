import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupsListComponent } from './groups-list.component';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { of } from 'rxjs';
import { IGroups } from '../interfaces/groups.interface';

describe('GroupsListComponent', () => {
  let component: GroupsListComponent;
  let fixture: ComponentFixture<GroupsListComponent>;
  let groupsService: GroupsService;
  let dialog: MatDialog;  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: GroupsService, useValue: { 
          getGroups: () => of({ data: [] }), 
          deleteGroup: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListComponent);
    component = fixture.componentInstance;
    groupsService = TestBed.inject(GroupsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load groups on initialization', () => {
    spyOn(groupsService, 'getGroups').and.returnValue(of({ data: [] }));
    component.loadGroups();
    expect(groupsService.getGroups).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete group', () => {
    spyOn(groupsService, 'deleteGroup').and.returnValue(of(null));
    component.delete(1);
    expect(groupsService.deleteGroup).toHaveBeenCalledWith('1');
  });
  
});
