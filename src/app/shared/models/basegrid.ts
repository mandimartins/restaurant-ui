import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";

export interface IBaseFilter {
    skip: number;
    take: number;
    sort: [];
}

export interface ITable<Type> {
    data: Type[];
    total: number;
}

export interface IGridService<Type> {
    getAll(params: IBaseFilter): Observable<ITable<Type>>
}

export class CustomDataSource<T> extends DataSource<T> {

    constructor(private gridService: IGridService<T>) {
        super()
    }

    public total: number = 0

    private sourceSubject = new BehaviorSubject<T[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    override connect(collectionViewer: CollectionViewer): Observable<readonly T[]> {
        return this.sourceSubject.asObservable();
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        this.sourceSubject.complete();
    }

    fetch(params: IBaseFilter) {

        this.loadingSubject.next(true);

        this.gridService
            .getAll(params)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe(data => {

                const table = data as ITable<T>
                this.total = table.total;

                this.sourceSubject.next(table.data as T[])

            })
    }
}