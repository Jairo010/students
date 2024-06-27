import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { ParticipantsService } from '../services/api_serivices/participants/participants.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-competition-participants-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './competition-participants-list.component.html',
  styleUrls: ['./competition-participants-list.component.css']
})
export class CompetitionParticipantsListComponent implements OnInit {
  competitions: any[] = [];
  selectedCompetition: any = null;
  groups: any[] = [];
  selectedGroup: any = null;
  participants: any[] = [];
  allParticipants: any[] = [];
  selectedParticipantId: string | null = null;
  loadingParticipants = false;
  displayedColumns: string[] = ['id', 'name', 'email', 'state', 'actions'];

  constructor(
    private competitionsService: CompetitionsService,
    private groupsService: GroupsService,
    private participantsService: ParticipantsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadCompetitions();
    this.loadAllParticipants();
    this.loadAllGroups(); // Agregamos la carga de todos los grupos al inicio
  }

  loadCompetitions() {
    console.log('Loading competitions');
    this.competitionsService.getCompetitionsCombo().subscribe(data => {
      this.competitions = data;
      console.log('Competitions loaded:', this.competitions);
    });
  }

  loadAllGroups() {
    console.log('Loading all groups');
    this.groupsService.getGroups().subscribe(data => {
      this.groups = data.data;
      console.log('All groups loaded:', this.groups);
    });
  }

  onSelectGroup(event: any) {
    console.log('Group selected:', event.value);
    this.selectedGroup = event.value;
    this.loadParticipants();
  }

  loadParticipants() {
    console.log('Loading participants for group:', this.selectedGroup);
    if (this.selectedGroup) {
      this.loadingParticipants = true;
      this.groupsService.getParticipantsByGroup(this.selectedGroup.Id_Grupo).subscribe(
        data => {
          this.participants = data.data;
          this.loadingParticipants = false;
          console.log('Participants loaded1:', this.participants);
        },
        error => {
          console.error('Error loading participants:', error);
          this.loadingParticipants = false;
        }
      );
    }
  }

  loadAllParticipants() {
    console.log('Loading all participants');
    this.participantsService.getParticimapts().subscribe(data => {
      this.allParticipants = data.data;
      console.log('All participants loaded:', this.allParticipants);
    });
  }

  deleteParticipant(participantId: string) {
    console.log('Deleting participant with ID:', participantId);
    if (confirm('¿Está seguro de eliminar este participante?')) {
      if (this.selectedGroup) {
        this.groupsService.deleteAssignGroup(this.selectedGroup.Id_Grupo, participantId).subscribe(
          () => {
            this.loadParticipants();
            this.snackBar.open('Participante eliminado correctamente.', 'Cerrar', {
              duration: 3000,
            });
            console.log('Participant deleted successfully');
          },
          error => {
            console.error('Error deleting participant:', error);
            this.snackBar.open('Error al eliminar el participante. Por favor, inténtalo de nuevo.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    }
  }
}
