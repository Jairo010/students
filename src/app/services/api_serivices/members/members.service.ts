import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, tap } from 'rxjs';
import { IMembers } from '../../../interfaces/members.interface';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }


  getMembers(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"members")
  }

  getMembersCombo(): Observable<IMembers[]> {
    return this.http.get<{ error: boolean, status: number, data: IMembers[] }>(environment.URL_API + "members").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getMemberById(id:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`members/${id}`)
  }

  updateMember(member:IMembers): Observable<IMembers>{
    return this.http.put<IMembers>(environment.URL_API+"members",member)
  }

  deleteMember(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`members/${id}`)
  }

  getClubsOfMember(card: string):Observable<any>{
    return this.http.get<any>(environment.URL_API+`members/clubs/${card}`)
  }

  getMembersByCard(card: string):Observable<any>{
    return this.http.get<any>(environment.URL_API+ `members/getByCard/${card}`)
  }
}
