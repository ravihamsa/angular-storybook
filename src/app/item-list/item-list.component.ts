import { Component, computed, input, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectItem } from '../value-display/value-display.component';
import {
  Size,
  SizedContainerComponent,
} from '../sized-container/sized-container.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [SizedContainerComponent, NgFor],
  template: ` <div class="flex flex-col shadow-2xl rounded-[6px] p-2">
    @if (items().length > 0) {
      <div *ngFor="let item of items(); index as i; trackBy: trackByFn">
        <app-sized-container
          label="{{ item?.label }}"
          [size]="size()"
          customClass="ring-0 w-full hover:bg-background-neutral-100 rounded-0"
          suffixIcon="borneo-icon-16-arrow-top-right-box"
          (click)="log(item)"
        >
        </app-sized-container>
      </div>
    } @else {
      <div>No items selected</div>
    }
  </div>`,
})
export class ItemListComponent implements OnInit {
  log(item: any) {
    console.log('Item clicked', item);
  }
  values = input<SelectItem['value'][]>([]);
  items = signal<SelectItem[]>([]);
  size = input(Size.medium);
  valueObjects = computed(() => {
    return this.values()
      .map((value) => {
        console.log(value, 'value', this.items());
        return this.items().find((item: SelectItem) => item.value === value);
      })
      .filter(Boolean);
  });
  dataSource = input.required<any>();
  trackByFn = (_index: number, item: SelectItem) => item.value;

  ngOnInit() {
    const dataSource = this.dataSource();
    console.log({ dataSource });
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

  protected readonly Size = Size;
}
