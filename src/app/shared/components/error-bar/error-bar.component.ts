import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrl: './error-bar.component.scss',
})
export class ErrorBarComponent {
  constructor() {}

  isOpen = false;
  errors: any[] = new Array<any>();

  handleError(error: HttpErrorResponse) {
    this.isOpen = true;
    this.errors = error.error;
  }

  closeErrorBar() {
    this.isOpen = false;
  }
}
