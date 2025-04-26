import { Component } from '@angular/core';
import { MenuItem } from '../../home.viewmodel';
import { Observable } from 'rxjs';
import { HomeService } from '../../home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-card-item',
  templateUrl: './menu-card-item.component.html',
  styleUrl: './menu-card-item.component.scss',
})
export class MenuCardItemComponent {
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
  ) {}

  menusItens$!: Observable<MenuItem[]>;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const menuId = Number(params['id']);
      this.menusItens$ = this.homeService.getMenuItens(menuId);
    });
  }
}
