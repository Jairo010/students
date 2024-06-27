import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IUniversities } from '../../../interfaces/universities.interface';

@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {

  http = inject(HttpClient);

  createUniversity(university:IUniversities): Observable<IUniversities>{
    return this.http.post<IUniversities>(environment.URL_API+"universities",university)
  }

  getUniversities(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"universities")
  }

  getUniversitiesCombo(): Observable<IUniversities[]> {
    return this.http.get<{ error: boolean, status: number, data: IUniversities[] }>(environment.URL_API + "universities").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }
  getUniversityById(id:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`universities/${id}`)
  }

  updateUniversity(university:IUniversities): Observable<IUniversities>{
    return this.http.put<IUniversities>(environment.URL_API+`universities`,university)
  }

  deleteUniversity(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`universities/${id}`)
  }
}
