import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GridViewModel } from './grid.viewmodel';
import { GridService } from './grid.service';
import { CustomDataSource, ISort } from '../../../shared/models/basegrid';
import { first } from 'rxjs';

import { ErrorBarComponent } from '../../../shared/components/error-bar/error-bar.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeletionComponent } from '../../../shared/components/confirm-deletion/confirm-deletion/confirm-deletion.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  constructor(private gridService: GridService,
    private router: Router,
    private matDialogService: MatDialog) { }

  displayedColumns: string[] = ['Actions', 'Id', 'Name', 'Description', 'Price', 'Category'];

  dataSource$ = new CustomDataSource<GridViewModel>(this.gridService);

  filterTerm: string = ''
  filterType: number = 1;
  skip: number = 0;
  take: number = 5;
  sort: ISort[] = [];
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  dialog!: MatDialogRef<ConfirmDeletionComponent>;

  ngOnInit() {

  }

  fetchTable() {
    this.dataSource$.fetch({
      take: this.paginator.pageSize,
      skip: this.paginator.pageIndex * this.paginator.pageSize,
      sort: this.sort,
      filterTerm: this.filterTerm,
      filterType: this.filterType
    })
  }

  ngAfterViewInit() {

  }

  onPageChange(e: PageEvent) {
    this.fetchTable()
  }

  onView({ Id }: GridViewModel) {
    this.router.navigate([`/product/visualize/${Id}`])
  }

  onUpdate({ Id }: GridViewModel) {
    this.router.navigate([`/product/edit/${Id}`])
  }

  onDelete({ Id }: GridViewModel) {

    this.openDialog();

    this.dialog.afterClosed().subscribe((confirmation) => {

      if (confirmation) {
        this.gridService
          .delete(Id)
          .pipe(first())
          .subscribe({
            next: (data) => this.fetchTable(),
            error: (error) => {
              return this.errorBar.handleError(error)
            }
          })
      }

    })
  }

  openDialog(): void {
    this.dialog = this.matDialogService.open(ConfirmDeletionComponent, {
      width: '300px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  onSortChange({ active, direction }: Sort) {
    this.sort = [];
    this.sort.push({ column: active, direction })
    this.fetchTable();
  }

}