import { Component, Input, OnInit } from '@angular/core';
import { DataTable, SortEvent } from './DataTable';

@Component({
  selector: 'afDefaultSorter',
  template: `
    <a style="cursor: pointer" (click)="sort()" class="text-nowrap">
      <ng-content></ng-content>
      <span
        [ngClass]="{
          'triangle-top': isSortedByMeAsc,
          'triangle-bottom': isSortedByMeDesc
        }"
        class="triangle"
        aria-hidden="true"
      ></span>
    </a>
  `
})
export class DefaultSorter implements OnInit {
  @Input('by') sortBy: string;

  isSortedByMeAsc: boolean = false;
  isSortedByMeDesc: boolean = false;

  public constructor(private afTable: DataTable) {}

  public ngOnInit(): void {
    this.afTable.onSortChange.subscribe((event: SortEvent) => {
      this.isSortedByMeAsc =
        event.sortBy == this.sortBy && event.sortOrder == 'asc';
      this.isSortedByMeDesc =
        event.sortBy == this.sortBy && event.sortOrder == 'desc';
    });
  }

  sort() {
    if (this.isSortedByMeAsc) {
      this.afTable.setSort(this.sortBy, 'desc');
    } else {
      this.afTable.setSort(this.sortBy, 'asc');
    }
  }
}
