import { Component, computed, input, OnInit, signal } from '@angular/core';
import {
  SelectItem,
  ValueDisplayComponent,
} from '../value-display/value-display.component';
import { Size } from '../sized-container/sized-container.component';
import { Observable } from 'rxjs';
import { ItemListComponent } from '../item-list/item-list.component';
import { getSingleSelectModel } from '../../utils';

@Component({
  selector: 'app-single-select-list',
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
      (itemClick)="selectionChange($event)"
    ></app-item-list>
  `,
})
export class SingleSelectListComponent implements OnInit {
  values = input<SelectItem['value'][]>([]);
  selectionModel = getSingleSelectModel();
  selectedValues = signal(this.selectionModel.selected);
  items = signal<SelectItem[]>([]);
  size = input(Size.medium);
  dataSource = input.required<any>();

  selectionChange(item: any) {
    this.selectionModel.select(item.value);
  }

  subscribeForSelection() {
    this.selectionModel.changed.subscribe((change) => {
      this.selectedValues.set(this.selectionModel.selected);
    });
    this.selectionModel.select(...this.values());
  }

  ngOnInit() {
    this.subscribeForSelection();
    const dataSource = this.dataSource();
    if (Array.isArray(dataSource)) {
      // Static data source
      this.items.set(dataSource);
    } else if (dataSource instanceof Observable) {
      // Observable (API or async data source)
      dataSource.subscribe((data) => {
        this.items.set(data);
      });
    } else if (dataSource.then) {
      // Promise (API or async data source)
      (dataSource as Promise<SelectItem[]>).then((data) => {
        this.items.set(data);
      });
    }
    return [];
  }
}
