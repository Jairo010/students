import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IProjects } from '../../../interfaces/projects.interface';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  http = inject(HttpClient);

  createProject(user:IProjects): Observable<IProjects>{
    return this.http.post<IProjects>(environment.URL_API+"projects",user)
  }

  getProjects(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"projects")
  }

  getProjectsCombo(): Observable<IProjects[]> {
    return this.http.get<{ error: boolean, status: number, data: IProjects[] }>(environment.URL_API + "projects").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }

  getProjectById(id:number): Observable<any>{
    return this.http.get<any>(environment.URL_API+`projects/${id}`)
  }

  updateProject(club:IProjects): Observable<IProjects>{
    return this.http.put<IProjects>(environment.URL_API+"projects",club)
  }

  deleteProject(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`projects/${id}`)
  }
}
