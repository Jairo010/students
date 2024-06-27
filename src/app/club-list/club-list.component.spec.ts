import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClubsListComponent } from './club-list.component';
import { ClubEditFormComponent } from '../club-edit-form/club-edit-form.component';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';

describe('ClubsListComponent', () => {
  let component: ClubsListComponent;
  let fixture: ComponentFixture<ClubsListComponent>;
  let clubsServiceSpy: jasmine.SpyObj<ClubsService>;
  let dialog: MatDialog;
  let clubsService: ClubsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsListComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: ClubsService, useValue: { 
          getClubs: () => of({ data: [] }), 
          deleteClub: () => of(null) 
        } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsListComponent);
    component = fixture.componentInstance;
    clubsService = TestBed.inject(ClubsService);
    dialog = TestBed.inject(MatDialog)
    fixture.detectChanges(); // Asegúrate de que los cambios se detectan después de crear el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clubs on initialization', () => {
    spyOn(clubsService, 'getClubs').and.returnValue(of({ data: [] }));
    component.loadClubs();
    expect(clubsService.getClubs).toHaveBeenCalled();
    expect(component.records).toEqual([]);
    expect(component.field).toEqual([]);
    expect(component.totalRecords).toBe(0);
    expect(component.data).toEqual([]);
  });

  it('should delete club', () => {
    spyOn(clubsService, 'deleteClub').and.returnValue(of(null));
    component.delete('1');
    expect(clubsService.deleteClub).toHaveBeenCalledWith('1');
  });

});
