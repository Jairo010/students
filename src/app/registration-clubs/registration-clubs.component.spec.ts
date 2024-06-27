import { IMembers } from './../interfaces/members.interface';
import { IClub } from './../interfaces/clubs.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationClubsComponent } from './registration-clubs.component';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';
import { Router } from '@angular/router';
import { MembersService } from '../services/api_serivices/members/members.service';
import { of } from 'rxjs';

describe('RegistrationClubsComponent', () => {
  let component: RegistrationClubsComponent;
  let fixture: ComponentFixture<RegistrationClubsComponent>;
  let clubsService: jasmine.SpyObj<ClubsService>;
  let router: jasmine.SpyObj<Router>;
  let membersService: jasmine.SpyObj<MembersService>;

  beforeEach(async () => {
    const clubsServiceSpy = jasmine.createSpyObj('ClubsService', ['createClub']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const membersServiceSpy = jasmine.createSpyObj('MembersService', ['getMembersCombo']);

    await TestBed.configureTestingModule({      
      imports: [ReactiveFormsModule, RegistrationClubsComponent],
      providers: [
        { provide: ClubsService, useValue: clubsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MembersService, useValue: membersServiceSpy }
      ]
    }).compileComponents();

    // Set the return value for the spy before the component is initialized
    membersServiceSpy.getMembersCombo.and.returnValue(of([
      { id: '1', name: 'Member 1' },
      { id: '2', name: 'Member 2' }
    ] as IMembers[]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationClubsComponent);
    component = fixture.componentInstance;
    clubsService = TestBed.inject(ClubsService) as jasmine.SpyObj<ClubsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    membersService = TestBed.inject(MembersService) as jasmine.SpyObj<MembersService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createClub method and navigate to /clubs on successful registration', () => {
    const mockClub: IClub = { name: 'Test Club', description: 'Test Description', cardResponsible: 'Test Card' };
    spyOn(window, 'alert');
    spyOn(console, 'log');
    clubsService.createClub.and.returnValue(of(mockClub));
    router.navigate.and.returnValue(Promise.resolve(true));

    component.register.get('name')?.setValue('Test Club');
    component.register.get('description')?.setValue('Test Description');
    component.register.get('card')?.setValue('Test Card');

    component.onSubmit();

    expect(clubsService.createClub).toHaveBeenCalledWith({
      name: 'Test Club',
      description: 'Test Description',
      cardResponsible: 'Test Card'
    });
    expect(window.alert).toHaveBeenCalledWith('Club registrado exitosamente');
    expect(console.log).toHaveBeenCalledWith('Club registrado exitosamente', mockClub);
    expect(router.navigate).toHaveBeenCalledWith(['/clubs']);
  });

  it('should display alert on invalid form submission', () => {
    spyOn(window, 'alert');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Formulario inválido');
  });

  it('should populate memberData on getMembers method call', () => {
    const mockMembers: IMembers[] = [
      {
        id: '1', name: 'Andres',
        card: '1792994728',
        lastName: 'Rojas',
        semester: 'Sexto',
        idMajor: 4,
        idRol: 1
      },
      {
        id: '2', name: 'Ismael',
        card: '1639203787',
        lastName: 'Paredes',
        semester: 'Tercero',
        idMajor: 2,
        idRol: 1
      }
    ];
    membersService.getMembersCombo.and.returnValue(of(mockMembers));

    component.getMembers();

    expect(component.memberData).toEqual(mockMembers);
  });
});
