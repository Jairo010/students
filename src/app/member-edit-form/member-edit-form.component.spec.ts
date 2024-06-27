import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberEditFormComponent, IMemberData } from './member-edit-form.component';
import { MembersService } from '../services/api_serivices/members/members.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('MemberEditFormComponent', () => {
  let component: MemberEditFormComponent;
  let fixture: ComponentFixture<MemberEditFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MemberEditFormComponent>>;
  let mockData: IMemberData;
  let mockMembersService: jasmine.SpyObj<MembersService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockData = {
      id: '1',
      card: '123456',
      name: 'John',
      lastName: 'Doe',
      semester: 'Spring',
      idMajor: '2',
      idRol: '3'
    };
    mockMembersService = jasmine.createSpyObj('MembersService', ['']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MemberEditFormComponent],      
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MembersService, useValue: mockMembersService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockDialogRef.close.calls.reset(); // Resetea las llamadas espías después de cada prueba
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data', () => {
    expect(component.group.value).toEqual(mockData);
  });

  it('should close the dialog with form data on save', () => {
    component.save();
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.group.value);
  });

  it('should close the dialog without form data on closeForm', () => {
    component.closeForm();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
