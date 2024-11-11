import { Component, EventEmitter, input, Output } from '@angular/core';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  template: ` <div
    class="bg-background-neutral-100 ts-body-3 py-0.5 px-2 inline-flex gap-2 rounded-md items-center text-nowrap"
  >
    <ng-content></ng-content>
    @if (showDelete()) {
      <div class="p-2" (click)="onDeleteClick($event)">
        <span class="borneo-icon-12-close"></span>
      </div>
    }
  </div>`,
})
export class TagComponent {
  showDelete = input(false);
  selectionId = input<string>('');
  @Output() deleteClick = new EventEmitter<void>();
  onDeleteClick(e: Event) {
    e.stopPropagation();
    this.selectionService.selectItem(this.selectionId());
  }
  constructor(private selectionService: SelectionService<string>) {}
}
