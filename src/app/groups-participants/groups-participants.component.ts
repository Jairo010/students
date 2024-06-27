import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/api_serivices/groups/groups.service';
import { CompetitionsService } from '../services/api_serivices/competitions/competitions.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-groups-participants',
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
  templateUrl: './groups-participants.component.html',
  styleUrls: ['./groups-participants.component.css']
})
export class GroupsParticipantsComponent implements OnInit {
  competitions: any[] = [];
  selectedCompetition: any = null;
  groups: any[] = [];
  selectedGroup: any = null;
  loadingGroups = false;
  displayedColumns: string[] = ['name', 'description', 'state', 'actions'];

  constructor(
    private groupsService: GroupsService,
    private competitionsService: CompetitionsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Initializing component...');
    this.loadCompetitions();
  }

  loadCompetitions() {
    console.log('Loading competitions...');
    this.competitionsService.getCompetitionsCombo().subscribe(data => {
      this.competitions = data;
      console.log('Competitions loaded:', this.competitions);
    });
  }

  onSelectCompetition(event: any) {
    console.log('Competition selected:', event.value);
    this.selectedCompetition = event.value;
    this.loadGroupsByCompetition();
  }

  loadGroupsByCompetition() {
    console.log('Loading groups for competition:', this.selectedCompetition);
    if (this.selectedCompetition) {
      console.log('Loading groups...');
      this.loadingGroups = true;
      this.competitionsService.getGroupsByCompetition(this.selectedCompetition.id).subscribe(
        data => {
          this.groups = data.data;
          this.loadingGroups = false;
          console.log('Groups loaded:', this.groups);
        },
        error => {
          console.error('Error loading groups:', error);
          this.loadingGroups = false;
        }
      );
    }
  }

  onSelectGroup(event: any) {
    console.log('Group selected:', event.value);
    this.selectedGroup = event.value;
  }

  deleteAssignCompetition(idGroup: string) {
    console.log('Deleting assignment for group ID:', idGroup);
    if (confirm('¿Está seguro de eliminar esta asignación de competición?')) {
      this.competitionsService.deleteAssignCompetition(this.selectedCompetition.id, idGroup).subscribe(
        () => {
          console.log('Assignment deleted successfully.');
          this.loadGroupsByCompetition();
          this.snackBar.open('Asignación eliminada correctamente.', 'Cerrar', {
            duration: 3000,
          });
        },
        error => {
          console.error('Error deleting assignment:', error);
          this.snackBar.open('Error al eliminar la asignación. Por favor, inténtalo de nuevo.', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
