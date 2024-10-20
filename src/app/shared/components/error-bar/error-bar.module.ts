import { NgModule } from '@angular/core';
import { ErrorBarComponent } from './error-bar.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [ErrorBarComponent],
  imports: [CommonModule, MatIcon],
  exports: [ErrorBarComponent],
})
export class ErrorBarModule {}
