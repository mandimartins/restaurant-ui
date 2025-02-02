import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { Menu } from './home.viewmodel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  menus$!: Observable<Menu[]>;

  ngOnInit() {
    this.menus$ = this.homeService.getMenus();
  }
}
