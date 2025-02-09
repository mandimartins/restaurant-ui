import { Component, Input } from '@angular/core';
import { Menu } from '../../home.viewmodel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  @Input()
  menu!: Menu;

  openMenu(menu: Menu) {
    this.router.navigate(['menu', menu.Id], { relativeTo: this.route });
  }
}
