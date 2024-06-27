import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MembersListComponent } from './members-list.component';
import { MemberEditFormComponent } from '../member-edit-form/member-edit-form.component';
import { MembersService } from '../services/api_serivices/members/members.service';
import { UserService } from '../services/api_serivices/user/user.service';
import { of } from 'rxjs';

describe('MembersListComponent', () => {
  let component: MembersListComponent;
  let fixture: ComponentFixture<MembersListComponent>;
  let membersService: MembersService;
  let userService: UserService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersListComponent],
      providers: [
        { provide: MembersService, useValue: { getMembers: () => of({ data: [] }), deleteMember: () => of (null) } },
        { provide: UserService, useValue: {} },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(null) }) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersListComponent);
    component = fixture.componentInstance;
    membersService = TestBed.inject(MembersService);
    userService = TestBed.inject(UserService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load members on initialization', () => {
    spyOn(membersService, 'getMembers').and.returnValue(of({ data: [] }));
    component.ngOnInit();
    expect(membersService.getMembers).toHaveBeenCalled();    
  });

  it('should open member edit form', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(null) } as MatDialogRef<MemberEditFormComponent>);
    component.openForm();
    expect(dialog.open).toHaveBeenCalledWith(MemberEditFormComponent, jasmine.any(Object));
    // Add more expectations here
  });

  it('should delete member', () => {
    spyOn(membersService, 'deleteMember').and.returnValue(of(null));
    component.delete('1');
    expect(membersService.deleteMember).toHaveBeenCalledWith('1');
  });
  
});