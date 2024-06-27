import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversityListComponent } from './university-list.component';
import { MatDialog } from '@angular/material/dialog';
import { UniversitiesService } from '../services/api_serivices/universities/universities.service';
import { of } from 'rxjs';

describe('UniversityListComponent', () => {
  let component: UniversityListComponent;
  let fixture: ComponentFixture<UniversityListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockUniversitiesService: jasmine.SpyObj<UniversitiesService>;
  let universitiesService: UniversitiesService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: UniversitiesService, useValue: { 
          getUniversities: () => of({ data: [] }), 
          deleteUniversity: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityListComponent);
    component = fixture.componentInstance;
    universitiesService = TestBed.inject(UniversitiesService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load universities on initialization', () => {
    spyOn(universitiesService, 'getUniversities').and.returnValue(of({ data: [] }));
    component.loadUniversities();
    expect(universitiesService.getUniversities).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete university', () => {
    spyOn(universitiesService, 'deleteUniversity').and.returnValue(of(null));
    component.delete('1');
    expect(universitiesService.deleteUniversity).toHaveBeenCalledWith('1');
  });

});