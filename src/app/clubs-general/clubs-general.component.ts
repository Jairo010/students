import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../services/api_serivices/clubs/clubs.service';
import { IClub } from '../interfaces/clubs.interface';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Agrega MatSnackBar
import { MemberSelectorDialogComponent } from '../member-selector-dialog/member-selector-dialog.component';

@Component({
  selector: 'app-clubs-general',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './clubs-general.component.html',
  styleUrls: ['./clubs-general.component.css']
})
export class ClubsGeneralComponent implements OnInit {
  clubs: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  selectedClub: any = null;
  members: any[] = [];

  pageSize = environment.PAGE_SIZE;
  pageIndex = 0;
  totalMembers = 0;

  constructor(
    private clubsService: ClubsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Agrega MatSnackBar al constructor
  ) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs() {
    this.clubsService.getClubsCombo().subscribe(data => {
      this.clubs = data;
    });
  }

  onSelectClub(club: IClub) {
    this.selectedClub = club;
    this.loadMembers();
  }

  loadMembers() {
    if (this.selectedClub) {
      this.clubsService.getMembersByClub(this.selectedClub.id).subscribe(data => {
        this.members = data.data;
        this.totalMembers = this.members.length;
        this.pageIndex = 0;
      });
    }
  }

  addMember() {
    const dialogRef = this.dialog.open(MemberSelectorDialogComponent, {
      width: '300px',
      data: { clubId: this.selectedClub.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clubsService.assignMember(this.selectedClub.id, result.cedula).subscribe(() => {
          this.loadMembers();
          this.snackBar.open('Miembro agregado correctamente.', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
        });
      }
    });
  }

  deleteMember(card: string) {
    if (confirm("¿Está seguro de eliminar este miembro?")) {
      this.clubsService.deleteAssignedMember(this.selectedClub!.id, card).subscribe(() => {
        this.loadMembers();
        this.snackBar.open('Miembro eliminado correctamente.', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
        });
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
