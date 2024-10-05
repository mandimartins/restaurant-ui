import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { UpdateComponent } from './update/update.component';
import { GridComponent } from './grid/grid.component';
import { ErrorBarModule } from "../../shared/components/error-bar/error-bar.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '../../shared/components/file-upload/file-upload.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeletionModule } from '../../shared/components/confirm-deletion/confirm-deletion/confirm-deletion.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    UpdateComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    MatFormFieldModule, 
    MatInputModule,
    MatPaginator,
    MatTableModule, 
    MatPaginatorModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatCardActions,
    MatButtonModule,
    MatCardTitle,
    MatSelect,
    MatOption,
    ErrorBarModule,
    MatIconModule,
    ConfirmDeletionModule,
    MatSortModule
],
providers:[CurrencyPipe]
})
export class ProductModule { }
