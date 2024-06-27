import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILogin, ISignUp } from '../../../interfaces/userAuth.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  signUpUserMember(user:ISignUp): Observable<ISignUp>{
    return this.http.post<ISignUp>(environment.URL_API+"auth/createUser",user)
  }

  logInUserMember(user:ILogin): Observable<ILogin>{
    return this.http.post<ILogin>(environment.URL_API+"auth/login",user)
  }
}
