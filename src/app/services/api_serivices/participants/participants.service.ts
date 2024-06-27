import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IParticipants } from '../../../interfaces/participants.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  http = inject(HttpClient);


  createParticipant(participant: IParticipants): Observable<IParticipants>{
    return this.http.post<IParticipants>(environment.URL_API+"participants",participant);
  }

  getParticimapts(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"participants")
  }

  getParticipantsCombo(): Observable<IParticipants[]> {
    return this.http.get<{ error: boolean, status: number, data: IParticipants[] }>(environment.URL_API + "participants").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getParticipantById(card:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`participants/${card}`)
  }

  getGroupOfParticipant(card:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`participants/groups/${card}`)
  }

  updateParticipant(participant:IParticipants): Observable<IParticipants>{
    return this.http.put<IParticipants>(environment.URL_API+"participants",participant)
  }

  deleteParticipant(card:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`participants/${card}`)
  }
}
