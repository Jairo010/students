import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMenu, MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() onToggleExpanded = new EventEmitter<boolean>();
  listMenu: IMenu[] = [];
  expanded = true;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.listMenu = this.menuService.getMenu();
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
    this.onToggleExpanded.emit(this.expanded);
  }
}
