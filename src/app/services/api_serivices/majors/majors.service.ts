import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MajorsService {

  http = inject(HttpClient);

  getMajors(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"majors")
  }

  getMajorById(id: number): Observable<any>{
    return this.http.get<any>(environment.URL_API+ `majors/${id}`)
  }
}
