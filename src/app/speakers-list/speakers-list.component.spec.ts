import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { SpeakersListComponent } from './speakers-list.component';
import { SpeakersService } from '../services/api_serivices/speakers/speakers.service';
import { ISpeakers } from '../interfaces/speakers.interface';

describe('SpeakersListComponent', () => {
  let component: SpeakersListComponent;
  let fixture: ComponentFixture<SpeakersListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>; // Asegurar que MatDialog esté correctamente tipado
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SpeakersListComponent>>;
  let mockSpeakersService: jasmine.SpyObj<SpeakersService>;
  let speakersService: SpeakersService;
  let dialog: MatDialog;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SpeakersListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: SpeakersService, useValue: { 
          getSpeakers: () => of({ data: [] }), 
          deleteSpeaker: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersListComponent);
    component = fixture.componentInstance;
    speakersService = TestBed.inject(SpeakersService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it('should load speakers on initialization', () => {
    spyOn(speakersService, 'getSpeakers').and.returnValue(of({ data: [] }));
    component.loadSpeakers();
    expect(speakersService.getSpeakers).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete speaker', () => {
    spyOn(speakersService, 'deleteSpeaker').and.returnValue(of(null));
    component.delete('1');
    expect(speakersService.deleteSpeaker).toHaveBeenCalledWith('1');
  });
});
