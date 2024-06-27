import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  http = inject(HttpClient);

  getRoles(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"roles")
  }

  getRolById(id: number): Observable<any>{
    return this.http.get<any>(environment.URL_API+ `roles/${id}`)
  }
}
