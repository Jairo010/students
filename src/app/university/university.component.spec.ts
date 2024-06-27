import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UniversityComponent } from './university.component';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';
import { of, throwError } from 'rxjs';
import { IUniversities } from '../interfaces/universities.interface';

describe('UniversityComponent', () => {
  let component: UniversityComponent;
  let fixture: ComponentFixture<UniversityComponent>;
  let mockUniversitiesService: jasmine.SpyObj<UniversitiesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    mockUniversitiesService = jasmine.createSpyObj('UniversitiesService', ['createUniversity']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({      
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        UniversityComponent
      ],
      providers: [
        { provide: UniversitiesService, useValue: mockUniversitiesService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.universitiesForm).toBeDefined();
    expect(component.universitiesForm.get('name')).toBeDefined();
    expect(component.universitiesForm.get('city')).toBeDefined();
    expect(component.universitiesForm.get('province')).toBeDefined();
  });

  it('should submit form successfully', () => {
    const mockUniversityData: IUniversities = {
      name: 'Test University',
      city: 'Test City',
      province: 'Test Province'
    };

    mockUniversitiesService.createUniversity.and.returnValue(of(mockUniversityData));

    // Set form values
    component.universitiesForm.setValue(mockUniversityData);

    // Trigger form submission
    component.onSubmit();

    // Check expectations
    expect(component.universitiesForm.valid).toBeTrue();
    expect(mockUniversitiesService.createUniversity).toHaveBeenCalledWith(mockUniversityData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/universidades']);
  });

  it('should navigate to university list on closeForm', () => {
    component.closeForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/university-list']);
  });
});
