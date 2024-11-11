import { effect, Injectable, input, signal } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService<T> {
  private selectionModel!: SelectionModel<T>;
  private selectedItemsSubject = new BehaviorSubject<T[]>([]);
  selectedItems$: Observable<T[]> = this.selectedItemsSubject.asObservable();
  values = signal<T[]>([]);

  constructor() {
    this.initializeSignal();
  }
  private initializeSignal() {
    // Sync observable values to the signal
    effect(
      () => {
        this.selectedItems$.subscribe((items) => {
          this.values.set(items);
        });
      },
      { allowSignalWrites: true },
    );
  }

  initializeSelection(allowMultiSelect: boolean = false): void {
    this.selectionModel = new SelectionModel<T>(allowMultiSelect, [], true);
    this.updateValues();
  }

  selectItem(item: T) {
    this.selectionModel.toggle(item);
    this.updateValues();
  }
  selectItems(items: T[]) {
    this.selectionModel.setSelection(...items);
    this.updateValues();
  }
  updateValues() {
    this.selectedItemsSubject.next(this.selectionModel.selected);
  }
  isSelected(item: T) {
    return this.selectionModel.isSelected(item);
  }
  clearSelection() {
    this.selectionModel.clear(true);
    this.updateValues();
  }
}
