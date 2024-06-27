import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembersService } from '../services/api_serivices/members/members.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-selector-dialog',
  standalone:true,
  imports:[CommonModule, MatButtonModule, MatIconModule,MatPaginatorModule, MatSelectModule, MatTableModule, SharedModule, FormsModule],
  templateUrl: './member-selector-dialog.component.html',
  styleUrls: ['./member-selector-dialog.component.css']
})
export class MemberSelectorDialogComponent implements OnInit {
  members: any[] = [];
  selectedMember: any;

  constructor(
    public dialogRef: MatDialogRef<MemberSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membersService: MembersService
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe(data => {
      this.members = data.data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
