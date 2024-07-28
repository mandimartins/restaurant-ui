import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { GridComponent } from './grid/grid.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { FileUploadModule } from '../../shared/components/file-upload/file-upload.module';
import { MatOption, MatSelect } from '@angular/material/select';
import { ErrorBarModule } from '../../shared/components/error-bar/error-bar.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GridComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
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
    MatButton,
    MatCardTitle,
    MatSelect,
    MatOption,
    ErrorBarModule,
    MatIconModule
  ]
})
export class CategoryModule { }
