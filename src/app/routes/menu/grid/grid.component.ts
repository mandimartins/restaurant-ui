import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GridViewModel } from './grid.viewmodel';
import { GridService } from './grid.service';
import { CustomDataSource, ISort } from '../../../shared/models/basegrid';
import { first } from 'rxjs';

import { ErrorBarComponent } from '../../../shared/components/error-bar/error-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeletionComponent } from '../../../shared/components/confirm-deletion/confirm-deletion.component';
import { Sort } from '@angular/material/sort';
import { FilterTypeEnum } from '../../../shared/enums/filterTypeEnum';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements AfterViewInit {
  constructor(
    private gridService: GridService,
    private router: Router,
    private matDialogService: MatDialog,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {}

  readonly filterTypeEnum = FilterTypeEnum;

  displayedColumns: string[] = [
    'Actions',
    'Id',
    'Title',
    'Description',
    'BadgeDescription',
  ];

  dataSource$ = new CustomDataSource<GridViewModel>(this.gridService);

  filterTerm = '';
  filterType = 1;
  skip = 0;
  take = 5;
  sort: ISort[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  dialog!: MatDialogRef<ConfirmDeletionComponent>;

  fetchTable() {
    this.dataSource$.fetch({
      take: this.paginator.pageSize,
      skip: this.paginator.pageIndex * this.paginator.pageSize,
      sort: this.sort,
      filterTerm: this.filterTerm,
      filterType: this.filterType,
    });
  }

  ngAfterViewInit() {
    this.activatedRoute.data.subscribe({
      next: ({ resolvedData }) => {
        this.filterTerm = resolvedData ? resolvedData : '';
        this.filterType = this.filterTypeEnum.Code;
        this.fetchTable();
      },
      error: (error: HttpErrorResponse) => this.errorBar.handleError(error),
    });
  }

  onPageChange() {
    this.fetchTable();
  }

  onGoBack() {
    this.location.back();
  }

  onAdd() {
    this.router.navigate([`/menu/edit/0`]);
  }

  onView({ Id }: GridViewModel) {
    this.router.navigate([`/menu/visualize/${Id}`]);
  }

  onUpdate({ Id }: GridViewModel) {
    this.router.navigate([`/menu/edit/${Id}`]);
  }

  onDelete({ Id }: GridViewModel) {
    this.openDialog();

    this.dialog.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.gridService
          .delete(Id)
          .pipe(first())
          .subscribe({
            next: () => this.fetchTable(),
            error: (error: HttpErrorResponse) => {
              return this.errorBar.handleError(error);
            },
          });
      }
    });
  }

  openDialog(): void {
    this.dialog = this.matDialogService.open(ConfirmDeletionComponent, {
      width: '300px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });
  }

  onSortChange({ active, direction }: Sort) {
    this.sort = [];
    this.sort.push({ column: active, direction });
    this.fetchTable();
  }
}
