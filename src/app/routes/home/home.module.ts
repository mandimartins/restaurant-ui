import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {
  MatCardModule,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuCardItemComponent } from './components/menu-card-item/menu-card-item.component';

@NgModule({
  declarations: [HomeComponent, MenuCardComponent, MenuCardItemComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatCardActions,
    MatButtonModule,
    MatCardTitle,
    MatProgressSpinnerModule,
  ],
})
export class HomeModule {}
