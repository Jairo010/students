import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>;
  @Input() lenght!: number;
  pageSize = environment.PAGE_SIZE;
  currentPage = 0;

  changePage(event:PageEvent){
    this.currentPage = event.pageIndex ?? 0;
    this.onChangePage.emit(this.currentPage); 
  }
}
