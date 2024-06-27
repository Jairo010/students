import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompetitionsEditFormComponent } from './competitions-edit-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompetitionsEditFormComponent', () => {
  let component: CompetitionsEditFormComponent;
  let fixture: ComponentFixture<CompetitionsEditFormComponent>;

  // Mock MatDialogRef
  const mockMatDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({      
      imports: [ FormsModule, ReactiveFormsModule, CommonModule, CompetitionsEditFormComponent, HttpClientTestingModule ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should save the form data', () => {
    const record = {
      id: '1',
      type: 'Competition',
      numParticipants: 10,
      price: 100,
      status: 'Active'
    };
    
    component.group.setValue(record);

    component.save();

    expect(mockMatDialogRef.close).toHaveBeenCalledWith(record);
  });
});
