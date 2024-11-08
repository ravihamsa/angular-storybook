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
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SizedContainerComponent } from '../sized-container/sized-container.component';
import { SizedTemplateDirective } from '../../directives/sized-template.directive';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ControlWrapperComponent } from './control-wrapper.component';
import { twMerge } from 'tailwind-merge';
import {
  SelectItem,
  ValueDisplayComponent,
} from '../value-display/value-display.component';
import { NgForOf } from '@angular/common';
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
import { border } from 'polished';

@Component({
  selector: 'app-single-select-input',
  standalone: true,
  template: `
    <app-control-wrapper [label]="label()" [caption]="caption()">
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
          <app-value-display
            [dataSource]="dataSource()"
            [values]="valueCopy() ? [valueCopy() || ''] : []"
          />
        </ng-template>
      </app-sized-container>
    </app-control-wrapper>
    <ng-template #listTemplate>
      <app-item-list
        [selectionModel]="selectionModel"
        [dataSource]="dataSource()"
        (itemClick)="selectOption($event.value)"
      ></app-item-list>
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
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SingleSelectInputComponent,
      multi: true,
    },
  ],
})
export class SingleSelectInputComponent extends FormFieldComponent<string> {
  @ViewChild('trigger', { read: ElementRef }) trigger!: ElementRef;
  @ViewChild('listTemplate') listTemplate!: TemplateRef<any>; // Reference to template

  overlayRef!: OverlayRef;
  positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  ];
  dataSource = input.required<any>();
  selectionModel = new SelectionModel<string>(false, []);
  overlay = inject(Overlay);
  viewContainerRef = inject(ViewContainerRef);
  outsideClickSubscription!: Subscription;

  openSelect(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger)
      .withPositions(this.positions)
      .withPush(true); // Ensure the overlay adapts when the viewport is resized

    const scrollStrategy = this.overlay.scrollStrategies.reposition(); // Adaptive repositioning

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true, // Enables backdrop click detection
      backdropClass: 'cdk-overlay-transparent-backdrop', // Transparent backdrop
    });

    this.overlayRef.attach(
      new TemplatePortal(this.listTemplate, this.viewContainerRef),
    );
    this.outsideClickSubscription = this.overlayRef
      .backdropClick()
      .subscribe(() => this.closeSelect());
  }

  closeSelect(): void {
    this.overlayRef?.dispose();
  }

  selectOption(option: string): void {
    this.selectionModel.select(option);
    this.closeSelect();
  }

  override ngOnInit() {
    this.selectionModel.changed.subscribe((value) => {
      if (value.added.length > 0) {
        this.valueCopy.set(value.added[0]);
      } else {
        this.valueCopy.set(undefined);
      }
    });
    const value = this.value();
    if (value) {
      this.selectionModel.select(value);
    }
  }

  public get inputClasses() {
    let classes = 'outline-0';
    if (this.formControl?.disabled) {
      classes = twMerge(
        classes,
        'cursor-not-allowed bg-background-neutral-300',
      );
    }
    if (this.formControl?.invalid) {
      classes = twMerge(classes, 'border-technical-red-default');
    }
    return classes;
  }

  protected readonly border = border;
}
