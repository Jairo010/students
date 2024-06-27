import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegistrationprojectsComponent } from "./registrationprojects/registrationprojects.component";
import { CoreModule } from "./core/core.module";
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, RegistrationprojectsComponent, LoginComponent, CoreModule]
})
export class AppComponent {
  title = 'frontend_app';
  isLoginRoute = false;
  isRegisterRoute= false;
  isConcursoRoute= false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginRoute = event.urlAfterRedirects === '/login';
        this.isRegisterRoute = event.urlAfterRedirects === '/participantes';
        this.isConcursoRoute = event.urlAfterRedirects === '/registrar-concurso';
      });
  }
}
