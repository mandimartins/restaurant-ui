import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { UpdateComponent } from './update/update.component';
import { gridResolver } from './grid/grid.resolver';
import { updateResolver } from './update/update.resolver';

const routes: Routes = [
  { path: 'list/:id', component: GridComponent, resolve: {resolvedData: gridResolver} },
  { path: 'list', component: GridComponent },
  { path: 'edit/:id', component: UpdateComponent, resolve: {resolvedData: updateResolver} },
  { path: 'visualize/:id', component: UpdateComponent, resolve: {resolvedData: updateResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
