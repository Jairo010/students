import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ITalks } from '../../../interfaces/talks.interface';

@Injectable({
  providedIn: 'root'
})
export class TalksService {

  http = inject(HttpClient);


  createTalk(talk: ITalks): Observable<ITalks>{
    return this.http.post<ITalks>(environment.URL_API+"talks",talk);
  }

  assignTalk(idTalk: string, card: string): Observable<any>{
    return this.http.post<any>(environment.URL_API+"talks/assign",{idTalk: idTalk, card: card});
  }

  getTalks(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"talks")
  }

  getTalksCombo(): Observable<ITalks[]> {
    return this.http.get<{ error: boolean, status: number, data: ITalks[] }>(environment.URL_API + "talks").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getTalkById(id:string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`talks/${id}`)
  }

  getSpeakersByTalk(idTalk: string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`talks/assign/${idTalk}`)
  }

  updateTalk(talk:ITalks): Observable<ITalks>{
    return this.http.put<ITalks>(environment.URL_API+"talks",talk)
  }

  deleteTalk(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`talks/${id}`)
  }

  deleteAssignedTalk(idTalk: string, card: string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`talks/assign/${idTalk}/${card}`)
  }
}
