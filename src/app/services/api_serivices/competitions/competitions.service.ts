import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ICompetition } from '../../../interfaces/competition.interface';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  http = inject(HttpClient);


  createCompetition(competition: ICompetition): Observable<ICompetition>{
    return this.http.post<ICompetition>(environment.URL_API+"competitions",competition);
  }

  assignCompetition(idCompetition: number, idGroup: number): Observable<any>{
    return this.http.post<any>(environment.URL_API+"competitions/assign",{idCompetition: idCompetition, idGroup: idGroup});
  }

  getCompetitions(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"competitions")
  }

  getCompetitionsCombo(): Observable<ICompetition[]> {
    return this.http.get<{ error: boolean, status: number, data: ICompetition[] }>(environment.URL_API + "competitions").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getCompetitionById(id:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`competitions/${id}`)
  }

  updateCompetition(competition:ICompetition): Observable<ICompetition>{
    return this.http.put<ICompetition>(environment.URL_API+"competitions",competition)
  }

  deleteCompetition(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`competitions/${id}`)
  }

  deleteAssignCompetition(idCompetition:string, idGroup: string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`competitions/assign/${idCompetition}/${idGroup}`)
  }

  getGroupsByCompetition(idCompetition: number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`competitions/assign/${idCompetition}`)
  }
}
