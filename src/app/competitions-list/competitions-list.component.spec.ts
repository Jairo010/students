import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CompetitionsListComponent } from './competitions-list.component';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { of } from 'rxjs';
import { ICompetition } from '../interfaces/competition.interface';

describe('CompetitionsListComponent', () => {
  let component: CompetitionsListComponent;
  let fixture: ComponentFixture<CompetitionsListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockCompetitionsService: jasmine.SpyObj<CompetitionsService>;
  let dialog : MatDialog;
  let competitionsService : CompetitionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionsListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: CompetitionsService, useValue: { 
          getCompetitions: () => of({ data: [] }), 
          deleteCompetition: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsListComponent);
    component = fixture.componentInstance;
    competitionsService = TestBed.inject(CompetitionsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load competitions on initialization', () => {
    spyOn(competitionsService, 'getCompetitions').and.returnValue(of({ data: [] }));
    component.loadCompetitions();
    expect(competitionsService.getCompetitions).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete competition', () => {
    spyOn(competitionsService, 'deleteCompetition').and.returnValue(of(null));
    component.delete('1');
    expect(competitionsService.deleteCompetition).toHaveBeenCalledWith('1');
  });

});
