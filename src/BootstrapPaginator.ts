import { Component, Input, OnChanges } from '@angular/core';
import { DataTable } from './DataTable';
import * as _ from 'lodash';

@Component({
  selector: 'afBootstrapPaginator',
  template: `
    <afPaginator #p [afTable]="afTable">
      <div class="paginator-container" *ngIf="p.dataLength > p.rowsOnPage">
        <div *ngIf="rowsOnPageSet.length > 0">
          Items per page:
          <ul class="list-inline">
            <li
              class="list-inline-item"
              *ngFor="let rows of rowsOnPageSet"
              [class.active]="p.rowsOnPage === rows"
              (click)="p.setRowsOnPage(rows)"
            >
              <a style="cursor: pointer">{{ rows }}</a>
            </li>
          </ul>
        </div>

        <div>Page: {{ p.activePage }} of {{ p.lastPage }}</div>
        <ul class="pagination">
          <li
            class="page-item"
            [class.disabled]="p.activePage <= 1"
            (click)="p.setPage(1)"
          >
            <a
              class="page-link"
              style="cursor: pointer"
              [innerHTML]="buttons.firstBtn"
            ></a>
          </li>
          <li
            class="page-item page-item--previous"
            [ngClass]="{ disabled: p.activePage === 1 }"
          >
            <a
              class="page-link"
              (click)="p.setPage(p.activePage - 1)"
              style="cursor: pointer"
              [innerHTML]="buttons.previousBtn"
            ></a>
          </li>
          <li
            class="page-item page-item--next"
            [ngClass]="{ disabled: p.activePage === p.lastPage }"
          >
            <a
              class="page-link"
              (click)="p.setPage(p.activePage + 1)"
              style="cursor: pointer"
              [innerHTML]="buttons.nextBtn"
            ></a>
          </li>
          <li
            class="page-item"
            [class.disabled]="p.activePage >= p.lastPage"
            (click)="p.setPage(p.lastPage)"
          >
            <a
              class="page-link"
              style="cursor: pointer"
              [innerHTML]="buttons.lastBtn"
            ></a>
          </li>
        </ul>
      </div>
    </afPaginator>
  `
})
export class BootstrapPaginator implements OnChanges {
  @Input('rowsOnPageSet') rowsOnPageSet = [];
  @Input('buttons') buttons: any = {
    firstBtn: 'First',
    lastBtn: 'Last',
    previousBtn: 'Previous',
    nextBtn: 'Next'
  };
  @Input('afTable') afTable: DataTable;

  minRowsOnPage = 0;

  ngOnChanges(changes: any): any {
    if (changes.rowsOnPageSet) {
      this.minRowsOnPage = _.min(this.rowsOnPageSet);
    }
  }
}
