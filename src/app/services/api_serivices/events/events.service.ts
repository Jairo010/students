import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvents } from '../../../interfaces/events.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  http = inject(HttpClient);

  createEvent(club:IEvents): Observable<IEvents>{
    return this.http.post<IEvents>(environment.URL_API+"events",club)
  }

  getEvents(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"events")
  }

  getEventById(id:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`events/${id}`)
  }

  updateEvent(club:IEvents): Observable<IEvents>{
    return this.http.put<IEvents>(environment.URL_API+`events`,club)
  }

  deleteEvent(id:number): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`events/${id}`)
  }

  assignCompetition(idEvent: string, idCompetition: string):Observable<any>{
    return this.http.post<any>(environment.URL_API+"events/competition", {idEvent: idEvent, idCompetition: idCompetition})
  }

  assignTalk(idEvent: string, idTalk: string):Observable<any>{
    return this.http.post<any>(environment.URL_API+"events/talk", {idEvent: idEvent, idTalk: idTalk})
  }

  deleteAssignedCompetition(idEvent: string, idCompetition: string ):Observable<any>{
    return this.http.delete<any>(environment.URL_API+ `events/competition/${idEvent}/${idCompetition}`)
  }

  deleteAssignedTalk(idEvent: string, idTalk: string):Observable<any>{
    return this.http.delete<any>(environment.URL_API+ `events/talk/${idEvent}/${idTalk}`)
  }

  getCompetitionsByEvent (idEvent: string):Observable<any>{
    return this.http.get<any>(environment.URL_API+`events/competition/${idEvent}`)
  }

  getTalksByEvent(idTalk: string):Observable<any>{
    return this.http.get<any>(environment.URL_API+`events/talk/${idTalk}`)
  }

}
