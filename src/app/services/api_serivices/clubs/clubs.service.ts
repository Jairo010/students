import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IClub } from '../../../interfaces/clubs.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  http = inject(HttpClient);

  createClub(club:IClub): Observable<IClub>{
    return this.http.post<IClub>(environment.URL_API+"clubs",club)
  }

  getClubs(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"clubs")
  }

  getClubsCombo(): Observable<IClub[]> {
    return this.http.get<{ error: boolean, status: number, data: IClub[] }>(environment.URL_API + "clubs").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }
  getClubById(id:string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`clubs/${id}`)
  }

  updateClub(club:IClub): Observable<IClub>{
    return this.http.put<IClub>(environment.URL_API+`clubs`,club)
  }

  deleteClub(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`clubs/${id}`)
  }

  assignMember(idClub: string, card: string): Observable<any>{
    return this.http.post<any>(environment.URL_API + "clubs/members", {idClub: idClub, card: card})
  }

  deleteAssignedMember(idClub: string, card: string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+ `clubs/members/${idClub}/${card}`)
  }

  getMembersByClub(idClub: string):Observable<any>{
    return this.http.get<any>(environment.URL_API+`clubs/members/${idClub}`)
  }
}
