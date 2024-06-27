import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationprojectsComponent } from './registrationprojects/registrationprojects.component';
import { MembersListComponent } from './members-list/members-list.component';
import { PageIndexComponent } from './core/page-index/page-index.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RegistrationMembersComponent } from './registration-members/registration-members.component';
import { ResgistrationTasksComponent } from './resgistration-tasks/resgistration-tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { RegistrationClubsComponent } from './registration-clubs/registration-clubs.component';
import { ClubsListComponent } from './club-list/club-list.component';
import { EventsListComponent } from './events-list/events-list.component';
import { RegistrationEventsComponent } from './registration-events/registration-events.component';
import { UniversityComponent } from './university/university.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { RegistrationGroupsComponent } from './registration-groups/registration-groups.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { CompetitionsListComponent } from './competitions-list/competitions-list.component';
import { RegistrationCompetitionsComponent } from './registration-competitions/registration-competitions.component';
import { RegistrationSpeakersComponent } from './registration-speakers/registration-speakers.component';
import { SpeakersListComponent } from './speakers-list/speakers-list.component';
import { RegistrationTalksComponent } from './registration-talks/registration-talks.component';
import { TalksListComponent } from './talks-list/talks-list.component';
import { ClubsGeneralComponent } from './clubs-general/clubs-general.component';
import { EventsGeneralComponent } from './events-general/events-general.component';
import { RegistrationParticipantsComponent } from './registration-participants/registration-participants.component';
import { AsignSpeakersComponent } from './asign-speakers/asign-speakers.component';
import { RegistrationParticipantCompetitionComponent } from './registration-participant-competition/registration-participant-competition.component';
import { CompetitionParticipantsListComponent } from './competition-participants-list/competition-participants-list.component';
import { GroupsParticipantsComponent } from './groups-participants/groups-participants.component';
import { ListParticipantsComponent } from './list-participants/list-participants.component';
import { TransactionsRegisterFormComponent } from './transactions-register-form/transactions-register-form.component';
import { TransactionsListComponent } from './transactions-list.component/transactions-list.component.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'pages-index', component: PageIndexComponent },
    { path: 'miembros', component: MembersListComponent },
    { path: 'registromiembros', component: RegistrationMembersComponent },
    { path: 'registroproyectos', component: RegistrationprojectsComponent },
    { path: 'proyectos', component: ProjectListComponent },
    { path: 'clubs', component: RegistrationClubsComponent },
    { path: 'clubs-list', component: ClubsListComponent},
    { path: 'clubs-miembros', component: ClubsGeneralComponent },
    { path: 'registrotareas', component: ResgistrationTasksComponent},
    { path: 'tareas', component: TasksListComponent},
    { path: 'eventos', component: EventsListComponent},
    { path: 'eventos-generales', component: EventsGeneralComponent },
    { path: 'events', component: RegistrationEventsComponent },
    { path: 'university', component: UniversityComponent },
    { path: 'university-list', component: UniversityListComponent },
    { path: 'group', component: RegistrationGroupsComponent},
    { path: 'group-list', component: GroupsListComponent },
    { path: 'competitions', component: RegistrationCompetitionsComponent },
    { path: 'competitions-list', component: CompetitionsListComponent},
    { path: 'speakers', component: RegistrationSpeakersComponent },
    { path: 'speakers-list', component: SpeakersListComponent },
    { path: 'talks', component: RegistrationTalksComponent },
    { path: 'talks-list', component: TalksListComponent },
    { path: 'participantes', component: RegistrationParticipantsComponent},
    { path: 'talkspeaker-list', component: AsignSpeakersComponent},
    { path: 'registrar-concurso', component: RegistrationParticipantCompetitionComponent},
    { path: 'competition-list', component: CompetitionParticipantsListComponent },
    { path: 'group-competition-list', component: GroupsParticipantsComponent },
    { path: 'participants-list', component: ListParticipantsComponent },
    { path: 'Transacciones', component: TransactionsRegisterFormComponent },
    { path: 'Transacciones-history', component: TransactionsListComponent },
];
