import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, tap } from 'rxjs';
import { ISpeakers } from '../../../interfaces/speakers.interface';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  http = inject(HttpClient);


  createSpeaker(speaker: ISpeakers): Observable<ISpeakers>{
    return this.http.post<ISpeakers>(environment.URL_API+"speakers",speaker);
  }

  getSpeakers(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"speakers")
  }

  getSpeakersCombo(): Observable<ISpeakers[]> {
    return this.http.get<{ error: boolean, status: number, data: ISpeakers[] }>(environment.URL_API + "speakers").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getSpeakerById(card:string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`speakers/${card}`)
  }

  getTalksOfSpeaker(card: string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`speakers/assign/${card}`)
  }

  updateSpeaker(speaker:ISpeakers): Observable<ISpeakers>{
    return this.http.put<ISpeakers>(environment.URL_API+"speakers",speaker)
  }

  deleteSpeaker(card:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`speakers/${card}`)
  }

}
