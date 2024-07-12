import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list/:id', component: GridComponent },
  { path: 'list', component: GridComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'edit', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
