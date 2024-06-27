import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClubEditFormComponent, IClubData } from './club-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MembersService } from '../services/api_serivices/members/members.service';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';
import { of } from 'rxjs';
import { IMembers } from '../interfaces/members.interface';

describe('ClubEditFormComponent', () => {
  let component: ClubEditFormComponent;
  let fixture: ComponentFixture<ClubEditFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ClubEditFormComponent>>;
  let mockData: IClubData;
  let mockClubsService: jasmine.SpyObj<ClubsService>;
  let mockMembersService: jasmine.SpyObj<MembersService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockData = { id: '1', name: 'Test Club', description: 'Test Description', cardResponsible: 'Test Responsible' };
    mockClubsService = jasmine.createSpyObj('ClubsService', ['updateClub', 'getClubById']); // Define at least one method
    mockMembersService = jasmine.createSpyObj('MembersService', ['getMembersCombo']);
    mockMembersService.getMembersCombo.and.returnValue(of([{
      id: '1', name: 'Luis',
      card: '1805223386',
      lastName: 'Almeida',
      semester: 'Quinto',
      idMajor: 1,
      idRol: 2
    }, {
      id: '2', name: 'Fernanda',
      card: '1808663920',
      lastName: 'Hernandez',
      semester: 'Tercero',
      idMajor: 3,
      idRol: 1
    }]));

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ClubEditFormComponent // Import the standalone component
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: ClubsService, useValue: mockClubsService },
        { provide: MembersService, useValue: mockMembersService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load members on ngOnInit', () => {
    spyOn(component, 'loadForm');
    spyOn(component, 'getMembers');

    component.ngOnInit();

    expect(component.loadForm).toHaveBeenCalled();
    expect(component.getMembers).toHaveBeenCalled();
  });

  it('should create form group with initial data', () => {
    component.data = { id: '1', name: 'Test Club', description: 'Test Description', cardResponsible: 'Test Responsible' };
    component.loadForm();

    expect(component.group.get('id')?.value).toBe('1');
    expect(component.group.get('name')?.value).toBe('Test Club');
    expect(component.group.get('description')?.value).toBe('Test Description');
    expect(component.group.get('cardResponsible')?.value).toBe('Test Responsible');
  });

  it('should close the dialog with form data on save', () => {
    component.group.setValue({ id: '1', name: 'Test Club', description: 'Test Description', cardResponsible: 'Test Responsible' });
    component.save();

    expect(mockDialogRef.close).toHaveBeenCalledWith({ id: '1', name: 'Test Club', description: 'Test Description', cardResponsible: 'Test Responsible' });
  });

  it('should close the dialog without form data on closeForm', () => {
    component.closeForm();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should get members on getMembers', () => {
    const mockResponse: IMembers[] = [{
      id: '1', name: 'Luis',
      card: '1805223386',
      lastName: 'Almeida',
      semester: 'Quinto',
      idMajor: 1,
      idRol: 2
    }, {
      id: '2', name: 'Fernanda',
      card: '1808663920',
      lastName: 'Hernandez',
      semester: 'Tercero',
      idMajor: 3,
      idRol: 1
    }];
    mockMembersService.getMembersCombo.and.returnValue(of(mockResponse));

    component.getMembers();

    expect(component.memberData).toEqual(mockResponse);
    expect(mockMembersService.getMembersCombo).toHaveBeenCalled();
  });
});
