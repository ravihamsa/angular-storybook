import {
  Component,
  computed,
  EventEmitter,
  input,
  OnInit,
  Output,
  signal,
  TrackByFunction,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import {
  Size,
  SizedContainerComponent,
} from '../sized-container/sized-container.component';
import { TagComponent } from '../tag/tag.component';
import { SelectionService } from '../services/selection.service';

export type SelectItem = {
  value: string;
  label: string;
};

export type ValueDisplayVariant = 'default' | 'tag' | 'pill' | 'tagWithDelete';

@Component({
  selector: 'app-value-display',
  standalone: true,
  imports: [NgFor, SizedContainerComponent, TagComponent],
  template: ` <div class="flex gap-2">
    @if (valueObjects().length > 0) {
      @if (variant() === 'tagWithDelete') {
        <app-tag
          [showDelete]="true"
          [selectionId]="item!!.value"
          *ngFor="let item of valueObjects(); index as i; trackBy: trackByFn"
          >{{ item?.label }}
        </app-tag>
      } @else {
        <span
          *ngFor="let item of valueObjects(); index as i; trackBy: trackByFn"
          >{{ item?.label }}
        </span>
      }
    } @else {
      <div class="text-content-tertiary">{{ placeholder() }}</div>
    }
  </div>`,
})
export class ValueDisplayComponent implements OnInit {
  variant = input<ValueDisplayVariant>('tagWithDelete');
  values = input<SelectItem['value'][]>([]);
  items = signal<SelectItem[]>([]);
  @Output() deleteClick = new EventEmitter<SelectItem>();
  placeholder = input<string>('Select an item');
  size = input(Size.medium);
  valueObjects = computed(() => {
    return this.selectionService
      .values()
      .map((value: any) => {
        return this.items().find((item: SelectItem) => item.value === value);
      })
      .filter(Boolean);
  });
  dataSource = input.required<any>();
  trackByFn: TrackByFunction<SelectItem> = (_index: number, item: SelectItem) =>
    item.value;

  constructor(private selectionService: SelectionService<string>) {}

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
