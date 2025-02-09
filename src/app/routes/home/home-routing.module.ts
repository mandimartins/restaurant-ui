import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MenuCardItemComponent } from './components/menu-card-item/menu-card-item.component';

const routes: Routes = [
  { path: 'menu/:id', component: MenuCardItemComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
