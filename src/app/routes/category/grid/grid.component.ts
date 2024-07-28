import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GridViewModel } from './grid.viewmodel';
import { GridService } from './grid.service';
import { CustomDataSource } from '../../../shared/models/basegrid';
import { first } from 'rxjs';
import { ErrorBarComponent } from '../../../shared/components/error-bar/error-bar.component';
import { Router } from '@angular/router';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  constructor(private gridService: GridService,
              private router: Router) { }

  displayedColumns: string[] = ['Actions','Id', 'Name', 'Description'];

  dataSource$ = new CustomDataSource<GridViewModel>(this.gridService);

  skip: number = 0;
  take: number = 5;
  sort: [] = [];
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  ngOnInit() {
    this.dataSource$.fetch({skip:this.skip, take: this.take, sort:this.sort})
  }

  fetchTable(){
    this.dataSource$.fetch({
      take: this.paginator.pageSize,
      skip: this.paginator.pageIndex * this.paginator.pageSize,
      sort:[]
    })
  }

  ngAfterViewInit() {

  }

  onPageChange(e:PageEvent){
    this.fetchTable()
  }

  onView({Id}: GridViewModel){
    this.router.navigate([`/category/visualize/${Id}`])
  }

  onUpdate({Id}: GridViewModel){
    this.router.navigate([`/category/edit/${Id}`])
  }

  onDelete({Id}: GridViewModel){
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
}