import { TalksService } from './../services/api_serivices/talks/talks.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TalksListComponent } from './talks-list.component';
import { of } from 'rxjs';
import { TalksEditFormComponent } from '../talks-edit-form/talks-edit-form.component';

describe('TalksListComponent', () => {
  let component: TalksListComponent;
  let fixture: ComponentFixture<TalksListComponent>;
  let talksServiceSpy: jasmine.SpyObj<TalksService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let talksService: TalksService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalksListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: TalksService, useValue: { 
          getTalks: () => of({ data: [] }), 
          deleteTalk: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalksListComponent);
    component = fixture.componentInstance;
    talksServiceSpy = TestBed.inject(TalksService) as jasmine.SpyObj<TalksService>;    
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    talksService = TestBed.inject(TalksService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load talks on initialization', () => {
    spyOn(talksService, 'getTalks').and.returnValue(of({ data: [] }));
    component.loadTalks();
    expect(talksService.getTalks).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete talk', () => {
    spyOn(talksService, 'deleteTalk').and.returnValue(of(null));
    component.delete('1');
    expect(talksService.deleteTalk).toHaveBeenCalledWith('1');
  });

});