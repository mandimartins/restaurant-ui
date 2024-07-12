import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule) }, 
  { path: 'orders', loadChildren: () => import('./routes/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'admin', loadChildren: () => import('./routes/admin/admin.module').then(m => m.AdminModule) },
  { path: 'menu', loadChildren: () => import('./routes/menu/menu.module').then(m => m.MenuModule) },
  { path: 'category', loadChildren: () => import('./routes/category/category.module').then(m => m.CategoryModule) },
  { path: 'product', loadChildren: () => import('./routes/product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
