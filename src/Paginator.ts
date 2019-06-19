import {
  Component,
  Input,
  SimpleChange,
  OnChanges,
  Optional
} from '@angular/core';
import { DataTable, PageEvent } from './DataTable';

@Component({
  selector: 'afPaginator',
  template: `
    <ng-content></ng-content>
  `
})
export class Paginator implements OnChanges {
  @Input('afTable') inputAfTable: DataTable;

  private afTable: DataTable;

  public activePage: number;
  public rowsOnPage: number;
  public dataLength: number = 0;
  public lastPage: number;

  public constructor(@Optional() private injectAfTable: DataTable) {}

  public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    this.afTable = this.inputAfTable || this.injectAfTable;
    this.onPageChangeSubscriber(this.afTable.getPage());
    this.afTable.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  public setPage(pageNumber: number): void {
    this.afTable.setPage(pageNumber, this.rowsOnPage);
  }

  public setRowsOnPage(rowsOnPage: number): void {
    this.afTable.setPage(this.activePage, rowsOnPage);
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this.activePage = event.activePage;
    this.rowsOnPage = event.rowsOnPage;
    this.dataLength = event.dataLength;
    this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
  };
}
