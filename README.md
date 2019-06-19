# Table component with sorting and pagination for Angular 7

It is a forked version of [@abdulk1/angular-6-datatable](https://github.com/abdulk1/angular-6-datatable).

##

## Installation

```
npm i @aflorin11/data-table --save
```

## Usage example

AppModule.ts

```typescript
import {NgModule} from "@angular/core";
...
import {DataTableModule} from "@aflorin11/data-table";

@NgModule({
    imports: [
        ...
        DataTableModule
    ],
    ...
})
export class AppModule {

}
```

AppComponent.html

```html
<table
  class="table table-striped"
  [afData]="data"
  #af="afDataTable"
  [afRowsOnPage]="5"
>
  <thead>
    <tr>
      <th style="width: 20%">
        <afDefaultSorter by="name">Name</afDefaultSorter>
      </th>
      <th style="width: 50%">
        <afDefaultSorter by="email">Email</afDefaultSorter>
      </th>
      <th style="width: 10%">
        <afDefaultSorter by="age">Age</afDefaultSorter>
      </th>
      <th style="width: 20%">
        <afDefaultSorter by="city">City</afDefaultSorter>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of af.data">
      <td>{{item.name}}</td>
      <td>{{item.email}}</td>
      <td class="text-right">{{item.age}}</td>
      <td>{{item.city | uppercase}}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">
        <afBootstrapPaginator
          [rowsOnPageSet]="[5,10,25]"
        ></afBootstrapPaginator>
      </td>
    </tr>
  </tfoot>
</table>
```

## API

### `afData` directive

- selector: `table[afData]`
- exportAs: `afDataTable`
- inputs
  - `afData: any[]` - array of data to display in table
  - `afRowsOnPage: number` - number of rows should be displayed on page (default: 1000)
  - `afActivePage: number` - page number (default: 1)
  - `afSortBy: any` - sort by parameter
  - `afSortOrder: string` - sort order parameter, "asc" or "desc"
- outputs
  - `afSortByChange: any` - sort by parameter
  - `afSortOrderChange: any` - sort order parameter

### `afDefaultSorter` component

- selector: `afDefaultSorter`
- inputs
  - `by: any` - specify how to sort data (argument for lodash function [\_.sortBy ](https://lodash.com/docs#sortBy))

### `afBootstrapPaginator` component

Displays buttons for changing current page and number of displayed rows using bootstrap template (css for bootstrap is required). If array length is smaller than current displayed rows on page then it doesn't show button for changing page. If array length is smaller than min value rowsOnPage then it doesn't show any buttons.

- selector: `afBootstrapPaginator`
- inputs
  - `rowsOnPageSet: number` - specify values for buttons to change number of diplayed rows
  - `buttons: object = { previousBtn: string, nextBtn: string }` - specify labels for previous, next buttons
