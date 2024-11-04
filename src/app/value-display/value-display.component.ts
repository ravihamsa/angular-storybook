import { Component, computed, input, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import {
  Size,
  SizedContainerComponent,
} from '../sized-container/sized-container.component';

type SelectItem = {
  value: string | number;
  label: string | number;
};

@Component({
  selector: 'app-value-display',
  standalone: true,
  imports: [NgFor, SizedContainerComponent],
  template: ` <div>
    @if (valueObjects().length > 0) {
      <app-sized-container
        *ngFor="let item of valueObjects(); index as i; trackBy: trackByFn"
        label="{{ item?.label }}"
        [size]="size()"
      >
      </app-sized-container>
    } @else {
      <div>No values selected</div>
    }
  </div>`,
})
export class ValueDisplayComponent implements OnInit {
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
