import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {NgScrollbarModule} from 'ngx-scrollbar';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableComponent } from './table/table.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ ContainerComponent,PaginatorComponent, TableComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    FlexModule,
    MatTableModule,
    NgScrollbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[
    MatButtonModule, MatDialogModule,MatIconModule, TableComponent,ContainerComponent,PaginatorComponent,NgScrollbarModule,FlexModule,MatTableModule
  ]
})
export class SharedModule { 
  
}
