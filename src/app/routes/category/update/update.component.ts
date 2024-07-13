import { Component, ViewChild, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateViewModel } from './update.viewmodel';
import { UpdateService } from './update.service';
import { first, merge } from 'rxjs';
import { ErrorBarComponent } from '../../../shared/components/error-bar/error-bar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {

  form: any;
  updateViewModel = new UpdateViewModel();
  descriptionErrorMessage = signal('');
  nameErrorMessage = signal('');

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  constructor(
    private formBuilder: FormBuilder,
    private updateService: UpdateService,
    private route: Router,
    private snackBar: MatSnackBar) {

      this.form = this.formBuilder.group({
        Code: [{ value: '', disabled: true },],
        Name: ['', [Validators.required, Validators.maxLength(35)]],
        Description: ['', [Validators.required, Validators.maxLength(80)]],
        // ParentCategory: ['',]
      })

    merge(this.form.controls.Name.statusChanges,
      this.form.controls.Name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNameErrorMessage());

    merge(this.form.controls.Description.statusChanges,
      this.form.controls.Description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDescriptionErrorMessage());
  }

  ngOnInit(): void {

  }

  onCancel(){
    this.route.navigate(['/admin'])
  }

  onSave() {
    const data = this.form.getRawValue();
    Object.assign(this.updateViewModel, data)

    this.updateService
      .Save(this.updateViewModel)
      .pipe(first())
      .subscribe({
        next: (data) => this.snackBar.open('Category created successfully!',"OK"),
        error: (error) => {
          return this.errorBar.handleError(error)
        }
      })
  }

  updateDescriptionErrorMessage() {
    if (this.form.controls.Description.hasError('required')) {
      this.descriptionErrorMessage.set('[Description] is required.');
    } else if (this.form.controls.Description.hasError('maxlength')) {
      this.descriptionErrorMessage.set('[Description] cannot have more than 80 characters');
    } else {
      this.descriptionErrorMessage.set('');
    }
  }

  updateNameErrorMessage() {
    if (this.form.controls.Name.hasError('required')) {
      this.nameErrorMessage.set('[Name] is required.');
    } else if (this.form.controls.Name.hasError('maxlength')) {
      this.nameErrorMessage.set('[Name] cannot have more than 35 characters');
    } else {
      this.nameErrorMessage.set('');
    }
  }

}
