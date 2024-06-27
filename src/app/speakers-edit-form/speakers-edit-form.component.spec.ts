import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpeakersEditFormComponent, ISpeakers } from './speakers-edit-form.component';
import { SpeakersService } from '../services/api_serivices/speakers/speakers.service';
import { of } from 'rxjs';

describe('SpeakersEditFormComponent', () => {
  let component: SpeakersEditFormComponent;
  let fixture: ComponentFixture<SpeakersEditFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SpeakersEditFormComponent>>;
  let mockSpeakersService: jasmine.SpyObj<SpeakersService>;

  const mockData: ISpeakers = {
    id: 1,
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123456789',
    biography: 'Test biography',
    topic: 'Test topic'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockSpeakersService = jasmine.createSpyObj('SpeakersService', ['createSpeaker']);

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, CommonModule, SpeakersEditFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: SpeakersService, useValue: mockSpeakersService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with existing data', () => {
    expect(component.title).toBe('EDITAR');
    expect(component.group).toBeTruthy();
    expect(component.group.value).toEqual({
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      biography: 'Test biography',
      topic: 'Test topic'
    });
  });

  it('should save changes and close dialog', () => {
    spyOn(window, 'alert');
    const updatedData: ISpeakers = { ...mockData, name: 'Jane' };

    component.group.patchValue(updatedData);
    component.save();

    expect(mockDialogRef.close).toHaveBeenCalledWith(updatedData);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should close dialog without saving', () => {
    spyOn(window, 'alert');
    component.closeForm();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

});
