import { Component, ViewChild, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm as IForm, UpdateViewModel } from './update.viewmodel';
import { UpdateService } from './update.service';
import { first, merge } from 'rxjs';
import { ErrorBarComponent } from '../../../shared/components/error-bar/error-bar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
  updateViewModel = new UpdateViewModel();
  form: FormGroup<IForm>;
  titleErrorMessage = signal('');
  descriptionErrorMessage = signal('');
  badgeDescriptionErrorMessage = signal('');

  visualize = false;

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  constructor(
    private formBuilder: FormBuilder,
    private updateService: UpdateService,
    private route: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
  ) {
    this.form = this.formBuilder.group({
      Id: [{ value: 0, disabled: true }],
      Active: [false, [Validators.required]],
      Title: ['', [Validators.required, Validators.maxLength(35)]],
      Description: ['', [Validators.required, Validators.maxLength(80)]],
      BadgeDescription: ['', [Validators.maxLength(20)]],
      BadgeColor: ['', []],
    });

    merge(
      this.form.controls.Title.statusChanges,
      this.form.controls.Title.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTitleErrorMessage());

    merge(
      this.form.controls.Description.statusChanges,
      this.form.controls.Description.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDescriptionErrorMessage());

    merge(
      this.form.controls.BadgeDescription.statusChanges,
      this.form.controls.BadgeDescription.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateBadgeDescriptionMessage());
  }

  ngOnInit(): void {
    this.configureEditVisualize();
  }

  configureEditVisualize() {
    this.activatedRoute.data.subscribe({
      next: ({ resolvedData }) => {
        this.form.reset(resolvedData);
        this.updateViewModel = resolvedData;

        if (this.route.url.includes('visualize')) {
          this.visualize = true;
          this.form.disable();
        }
      },
      error: (error) => this.errorBar.handleError(error),
    });
  }

  onCancel() {
    this.route.navigate([`/menu/list/${this.updateViewModel.Id}`]);
  }

  onSave() {
    // this.prepareFieldsToSubmit();

    const data = this.form.getRawValue();

    Object.assign(this.updateViewModel, data);

    this.updateService
      .Save(this.updateViewModel)
      .pipe(first())
      .subscribe({
        next: () => this.snackBar.open('Menu created successfully!', 'OK'),
        error: (error: HttpErrorResponse) => {
          return this.errorBar.handleError(error);
        },
      });
  }

  updateTitleErrorMessage() {
    if (this.form.controls.Title.hasError('required')) {
      this.titleErrorMessage.set('[Title] is required.');
    } else if (this.form.controls.Title.hasError('maxlength')) {
      this.titleErrorMessage.set('[Title] cannot have more than 35 characters');
    } else {
      this.titleErrorMessage.set('');
    }
  }

  updateDescriptionErrorMessage() {
    if (this.form.controls.Description.hasError('required')) {
      this.descriptionErrorMessage.set('[Description] is required.');
    } else if (this.form.controls.Description.hasError('maxlength')) {
      this.descriptionErrorMessage.set(
        '[Description] cannot have more than 80 characters',
      );
    } else {
      this.descriptionErrorMessage.set('');
    }
  }

  updateBadgeDescriptionMessage() {
    if (this.form.controls.BadgeDescription.hasError('maxlength')) {
      this.badgeDescriptionErrorMessage.set(
        '[Badge Description] cannot have more than 20 characters.',
      );
    } else {
      this.badgeDescriptionErrorMessage.set('');
    }
  }

  // formatCurrency() {
  //   let price = this.form.get('Price').value;
  //   price = this.currencyPipe.transform(price, 'USD', 'symbol', '1.2-2');
  //   this.form.get('Price').setValue(price, { emitEvent: false });
  // }

  // prepareFieldsToSubmit() {
  //   let price = this.form.get('Price').value;
  //   price = price.replace(/[^0-9.]/g, '');

  //   this.form.get('Price').setValue(price);
  // }
}
