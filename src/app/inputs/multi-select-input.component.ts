import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  Injector,
  input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SizedContainerComponent } from '../sized-container/sized-container.component';
import { SizedTemplateDirective } from '../../directives/sized-template.directive';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ControlWrapperComponent } from './control-wrapper.component';
import { twMerge } from 'tailwind-merge';
import {
  SelectItem,
  ValueDisplayComponent,
} from '../value-display/value-display.component';
import { NgForOf, NgIf } from '@angular/common';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import {
  CdkOverlayOrigin,
  ConnectedPosition,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { SingleSelectInputComponent } from './single-select-input.component';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-multi-select-input',
  standalone: true,
  template: `
    <app-control-wrapper
      [label]="label()"
      [caption]="caption()"
      [required]="formControl?.hasValidator(Validators.required) === true"
    >
      <app-sized-container
        #trigger
        [size]="size()"
        suffixIcon="borneo-icon-16-arrow-down"
        [prefixIcon]="prefixIcon()"
        [isInteractive]="true"
        [disabled]="formControl?.disabled === true"
        [isError]="formControl?.invalid === true"
        (click)="openSelect()"
      >
        <ng-template sizedTemplate="content">
          <div class="flex w-full justify-between items-center">
            <app-value-display
              [dataSource]="dataSource()"
              [values]="valueCopy() || []"
              [placeholder]="placeholder()"
            />
            @if (canClear()) {
              <span
                *ngIf="valueCopy()"
                class="cursor-pointer"
                (click)="clearSelection()"
              >
                <span class="borneo-icon-16-clear-gray"></span>
              </span>
            }
          </div>
        </ng-template>
      </app-sized-container>
    </app-control-wrapper>
    <ng-template #listTemplate>
      <app-item-list
        [dataSource]="dataSource()"
        (itemClick)="selectOption($event.value)"
        variant="checkbox"
      >
      </app-item-list>
    </ng-template>
  `,
  imports: [
    ReactiveFormsModule,
    SizedContainerComponent,
    SizedTemplateDirective,
    ControlWrapperComponent,
    NgForOf,
    ItemListComponent,
    ValueDisplayComponent,
    CdkOverlayOrigin,
    NgIf,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectInputComponent,
      multi: true,
    },
    SelectionService,
  ],
})
export class MultiSelectInputComponent extends SingleSelectInputComponent {
  override selectOption(option: string): void {
    this.selectionService.selectItem(option);
  }
  override writeValue(value: string[]): void {
    if (value) {
      this.selectionService.selectItems(value);
    } else {
      this.selectionService.clearSelection();
    }
  }

  override ngOnInit() {
    this.selectionService.initializeSelection(true);
    this.selectionService.selectedItems$.subscribe((value) => {
      this.valueCopy.set(value);
      this.onChange(value);
    });
  }
}

// const tmp = new SelectionModel<number>(false, []);
// tmp.changed.subscribe((value) => {
//   console.log(value, 'changed');
// });
//
// tmp.select(1);
// tmp.select(2);
// tmp.clear();
