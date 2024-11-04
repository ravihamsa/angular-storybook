import { Component } from '@angular/core';
import { ValueDisplayComponent } from '../value-display/value-display.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { SingleSelectListComponent } from '../single-select-list/single-select-list.component';
import { getMultiSelectModel } from '../../utils';

@Component({
  selector: 'app-multi-select-list',
  standalone: true,
  imports: [ValueDisplayComponent, ItemListComponent],
  template: `
    <app-value-display
      [values]="selectedValues()"
      [dataSource]="dataSource()"
    ></app-value-display>
    <app-item-list
      [values]="selectedValues()"
      [selectionModel]="selectionModel"
      [dataSource]="dataSource()"
      (selectionChange)="selectionChange($event)"
    ></app-item-list>
  `,
})
export class MultiSelectListComponent extends SingleSelectListComponent {
  override selectionModel = getMultiSelectModel();
  override selectionChange(item: any) {
    this.selectionModel.toggle(item.value);
  }
}
