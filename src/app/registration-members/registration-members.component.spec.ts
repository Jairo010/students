import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMembersComponent } from './registration-members.component';
import { UserService } from '../services/api_serivices/user/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegistrationMembersComponent', () => {
  let component: RegistrationMembersComponent;
  let fixture: ComponentFixture<RegistrationMembersComponent>;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationMembersComponent, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [UserService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationMembersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be an Object when all inpust are fill', () => {
    const emial = component.register.controls['email'];
    const password = component.register.controls['password'];
    const card = component.register.controls['card'];
    const name = component.register.controls['name'];
    const lastName = component.register.controls['lastName'];
    const semester = component.register.controls['semester'];
    const major = component.register.controls['major'];
    const rol = component.register.controls['rol'];

    emial.setValue('jairofre@gmail.com');
    password.setValue('12345678');
    card.setValue('1809');
    name.setValue('Jairo');
    lastName.setValue('Freire');
    semester.setValue('Sexto');
    major.setValue('1');
    rol.setValue('1');

    const mockUser: any = { 
      data: {},
      error: false,
      status: 200
    };
      component.onSignUp();
    
      const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/auth/createUser'); // Ajusta la URL según tu API
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
  
      expect(component.user).toEqual(mockUser);
  });
});