import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { TalksEditFormComponent, ITalks } from './talks-edit-form.component';
import { TalksService } from '../services/api_serivices/talks/talks.service';

describe('TalksEditFormComponent', () => {
  let component: TalksEditFormComponent;
  let fixture: ComponentFixture<TalksEditFormComponent>;
  let mockDialogRef: MatDialogRef<TalksEditFormComponent>;
  let mockTalksService: jasmine.SpyObj<TalksService>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockTalksService = jasmine.createSpyObj('TalksService', ['updateTalk']);

    TestBed.configureTestingModule({      
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TalksEditFormComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TalksService, useValue: mockTalksService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Reset providers if necessary
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: {} });

    fixture = TestBed.createComponent(TalksEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 

  it('should initialize form for editing talk', () => {
    const mockTalkData: ITalks = {
      id: 1,
      topic: 'Angular',
      image: 'angular.png',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Active'
    };

    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: mockTalkData });

    fixture = TestBed.createComponent(TalksEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.title).toBe('EDITAR');
    expect(component.group).toBeDefined();

    const formControls = component.group.controls;
    expect(formControls['id'].value).toBe(1);
    expect(formControls['topic'].value).toBe('Angular');
    expect(formControls['image'].value).toBe('angular.png');
    expect(formControls['startDate'].value).toEqual(mockTalkData.startDate);
    expect(formControls['endDate'].value).toEqual(mockTalkData.endDate);
    expect(formControls['status'].value).toBe('Active');
  });

  it('should save talk', () => {
    const mockTalkData: ITalks = {
      id: 1,
      topic: 'Angular',
      image: 'angular.png',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Active'
    };

    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: mockTalkData });

    fixture = TestBed.createComponent(TalksEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Set form values
    component.group.setValue({
      id: 1,
      topic: 'New Angular Talk',
      image: 'new-angular.png',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending'
    });

    // Mock the service response
    const expectedResponse: ITalks = {
      ...component.group.getRawValue() // Assuming updateTalk returns the updated object
    };
    mockTalksService.updateTalk.and.returnValue(of(expectedResponse));

    // Call save method
    component.save();

    expect(mockTalksService.updateTalk).toHaveBeenCalledWith({      
      topic: 'New Angular Talk',
      image: 'new-angular.png',
      startDate: component.group.value.startDate,
      endDate: component.group.value.endDate,
      status: 'Pending'
    });

    expect(mockDialogRef.close).toHaveBeenCalledWith(expectedResponse);
  });

});
