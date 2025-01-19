import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrl: './confirm-deletion.component.scss',
})
export class ConfirmDeletionComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeletionComponent>) {}

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
