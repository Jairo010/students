import { Component } from '@angular/core';

@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrl: './page-index.component.css'
})
export class PageIndexComponent {
  expanded=true

  toggleExpanded(expanded:boolean):void{
    this.expanded = expanded
  }
}
