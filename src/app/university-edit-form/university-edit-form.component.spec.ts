import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UniversityEditFormComponent } from './university-edit-form.component';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';
import { of } from 'rxjs';
import { IUniversities } from '../interfaces/universities.interface';

describe('UniversityEditFormComponent', () => {
  let component: UniversityEditFormComponent;
  let fixture: ComponentFixture<UniversityEditFormComponent>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<UniversityEditFormComponent>>;
  let mockUniversitiesService: jasmine.SpyObj<UniversitiesService>;

  const mockData: IUniversities = {
    name: 'Test University',
    city: 'Test City',
    province: 'Test Province'
  };

  beforeEach(waitForAsync(() => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockUniversitiesService = jasmine.createSpyObj('UniversitiesService', ['dummyMethod']);

    TestBed.configureTestingModule({      
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        UniversityEditFormComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: UniversitiesService, useValue: mockUniversitiesService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with provided data', () => {
    expect(component.title).toBe('EDITAR');
    expect(component.group).toBeDefined();    
    expect(component.group.get('name')?.value).toBe(mockData.name);
    expect(component.group.get('city')?.value).toBe(mockData.city);
    expect(component.group.get('province')?.value).toBe(mockData.province);
  });

  it('should save form data and close dialog', () => {
    const updatedData: IUniversities = {      
      //id : undefined,
      name: 'Updated University Name',
      city: 'Test City',
      province: 'Test Province'
    };
  
    // Simular que el usuario ha modificado el nombre en el formulario
    component.group.get('name')?.setValue(updatedData.name);
  
    // Llamar al método save() del componente
    component.save();
  
    // Verificar que MatDialogRef.close haya sido llamado con los datos actualizados
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(updatedData);
  });
  
  
});
