import { Component, ViewChild, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateViewModel } from './update.viewmodel';
import { UpdateService } from './update.service';
import { first, merge } from 'rxjs';
import { ErrorBarComponent } from '../../../shared/components/error-bar/error-bar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';

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
  priceErrorMessage = signal('');

  visualize = false;

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  constructor(
    private formBuilder: FormBuilder,
    private updateService: UpdateService,
    private route: Router,
    private snackBar: MatSnackBar,
    private activaredRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe) {

    this.form = this.formBuilder.group({
      Id: [{ value: 0, disabled: true },],
      Name: ['', [Validators.required, Validators.maxLength(35)]],
      Description: ['', [Validators.required, Validators.maxLength(80)]],
      Price: [null,[Validators.required]],
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
    this.configureEditVisualize();
  }

  configureEditVisualize() {

    const id = this.activaredRoute.snapshot.params['id']

    if (id > 0)
      this.updateService.Get(id)
        .pipe(first())
        .subscribe({
          next: data => {
            this.form.reset(data);

            if (this.route.url.includes('visualize')) {
              this.visualize = true
              this.form.disable();
            }
          },
          error: error => this.errorBar.handleError(error)
        })
  }

  onCancel() {
    this.route.navigate(['/admin'])
  }

  onSave() {

    this.prepareFieldsToSubmit()

    const data = this.form.getRawValue();

    data.IdCategory = 25 //testing insertion of product  (depends on category)

    Object.assign(this.updateViewModel, data)

    this.updateService
      .Save(this.updateViewModel)
      .pipe(first())
      .subscribe({
        next: (data) => this.snackBar.open('Product created successfully!', "OK"),
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

  updatePriceErrorMessage() {
    if (this.form.controls.Name.hasError('required')) {
      this.priceErrorMessage.set('[Price] is required.');
    } else {
      this.priceErrorMessage.set('');
    }
  }

  formatCurrency() {
    let price = this.form.get('Price').value;
    price = this.currencyPipe.transform(price, 'USD', 'symbol', '1.2-2');
    this.form.get('Price').setValue(price, { emitEvent: false });
  }

  prepareFieldsToSubmit() {

    let price = this.form.get('Price').value
    price = price.replace(/[^0-9.]/g, '');
  
    this.form.get('Price').setValue(price);
  }

}
