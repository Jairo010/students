import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IGroups } from '../../../interfaces/groups.interface';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  http = inject(HttpClient);


  createGroup(group: IGroups): Observable<IGroups>{
    return this.http.post<IGroups>(environment.URL_API+"groups",group);
  }

  assignGroup(idGroup: number, card: string, key: string): Observable<any>{
    return this.http.post<any>(environment.URL_API+"groups/assign",{idGroup: idGroup, card: card, key: key});
  }

  getGroups(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"groups")
  }

  getGroupsCombo(): Observable<IGroups[]> {
    return this.http.get<{ error: boolean, status: number, data: IGroups[] }>(environment.URL_API + "groups").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getGroupById(id:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`groups/${id}`)
  }

  getParticipantsByGroup(idGroup:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`groups/assign/${idGroup}`)
  }

  updateGroup(group:IGroups): Observable<IGroups>{
    return this.http.put<IGroups>(environment.URL_API+"groups",group)
  }

  deleteGroup(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`groups/${id}`)
  }

  deleteAssignGroup(idGroup: number, card:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`groups/assign/${idGroup}/${card}`)
  }

  getCompetitionsOfGroup(id: string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`groups/assign/competitions/${id}`)
  }
}
