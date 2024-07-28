import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeletionComponent } from './confirm-deletion.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ConfirmDeletionComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ]
})
export class ConfirmDeletionModule { }
