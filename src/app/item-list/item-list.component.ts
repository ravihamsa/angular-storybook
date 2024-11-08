import {
  Component,
  computed,
  EventEmitter,
  HostBinding,
  Input,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectItem } from '../value-display/value-display.component';
import {
  Size,
  SizedContainerComponent,
} from '../sized-container/sized-container.component';
import { NgFor } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [SizedContainerComponent, NgFor],
  template: `
    @if (items().length > 0) {
      <div *ngFor="let item of items(); index as i; trackBy: trackByFn">
        <app-sized-container
          label="{{ item?.label }}"
          [size]="size()"
          [customClass]="customClass(item)"
          suffixIcon="borneo-icon-16-arrow-top-right-box"
          (click)="itemClick.emit(item)"
        >
        </app-sized-container>
      </div>
    } @else {
      <div>No items selected</div>
    }
  `,
})
export class ItemListComponent implements OnInit {
  @HostBinding('class') class =
    'bg-background-neutral-screen flex flex-col shadow-2xl rounded-md p-2 w-full';
  @Output() itemClick = new EventEmitter<SelectItem>();
  selectionModel = input<SelectionModel<string>>();
  values = input<SelectItem['value'][]>([]);
  items = signal<SelectItem[]>([]);
  size = input(Size.medium);
  dataSource = input.required<any>();
  trackByFn = (_index: number, item: SelectItem) => item.value;

  customClass(item: SelectItem) {
    let classes = 'ring-0 w-full hover:bg-background-neutral-100 rounded-md';
    if (this.selectionModel()?.isSelected(item.value)) {
      classes = twMerge(
        classes,
        'bg-background-neutral-300 hover:bg-background-neutral-300',
      );
    }
    return classes;
  }

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
