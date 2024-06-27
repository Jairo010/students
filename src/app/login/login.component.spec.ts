import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserService } from '../services/api_serivices/user/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,LoginComponent, HttpClientTestingModule],
      providers: [UserService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.login).toBeDefined();
  });

  xit('should have email and password fields', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
    
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.login.valid).toBeFalsy();
  });

  it('email field should be invalid when empty', () => {
    const username = component.login.controls['email'];
    expect(username.valid).toBeFalsy();
    expect(username.errors!['required']).toBeTruthy();
  });

  it('password field should be invalid when empty', () => {
    const password = component.login.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.errors!['required']).toBeTruthy();
  });

  it('form should be valid when filled correctly', () => {
    const username = component.login.controls['email'];
    const password = component.login.controls['password'];

    username.setValue('testuser@gmail.com');
    password.setValue('password123');
    
    expect(component.login.valid).toBeTruthy();
  });

  it('form should be an Object when credentials are correts', () => {
    const username = component.login.controls['email'];
    const password = component.login.controls['password'];

    username.setValue('juanperez@gmail.com');
    password.setValue('12345678');

    const mockUser: any = { 
      data: {user:{}},
      error: false,
      status: 200
    };

      component.onLogin();
    
      const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/auth/login'); // Ajusta la URL según tu API
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
  
      expect(component.user).toEqual(mockUser);
  });


  it('form should be an Object when credentials are incorrets', () => {
    const username = component.login.controls['email'];
    const password = component.login.controls['password'];

    username.setValue('juanperez@gmail.com.com');
    password.setValue('12345678');

    const mockUser: any = { 
      data: "AuthApiError: Invalid login credentials",
      error: true,
      status: 500
    };

      component.onLogin();
    
      const req = httpMock.expectOne('https://studentsmanagementclub-back.onrender.com/api/auth/login'); // Ajusta la URL según tu API
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
  
      expect(component.user).toEqual(mockUser);
  });


  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onLogin');
    
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    
    expect(component.onLogin).toHaveBeenCalled();
  });
});