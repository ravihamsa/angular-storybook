import { Component, EventEmitter, input, Output } from '@angular/core';
import {
  Size,
  SizedContainerComponent,
} from '../sized-container/sized-container.component';
import { BorneoIcon } from '../../types/iconType';
import { NgClass } from '@angular/common';

export enum Variant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [SizedContainerComponent, NgClass],
  template: `
    <button
      [ngClass]="classes"
      [disabled]="disabled()"
      class="right-1"
      [tabIndex]="isInteractive() ? -1 : null"
    >
      <span [class]="prefixIconClasses">
        <span [class]="prefixIcon()"> </span>
      </span>
      <div class="flex justify-between items-center">
        {{ label() }}
        <span [class]="suffixIconClasses">
          <span [class]="suffixIcon()"> </span>
        </span>
      </div>
    </button>
  `,
})
export class ButtonComponent extends SizedContainerComponent {
  variant = input(Variant.primary);

  @Output() click = new EventEmitter<Event>();

  public override get classes() {
    const classes = this.baseClasses;
    classes.push(this.sizeClasses);

    switch (this.variant()) {
      case Variant.primary:
        if (this.disabled()) {
          classes.push('bg-background-neutral-300 text-content-tertiary');
        } else {
          classes.push(
            'bg-content-primary hover:bg-content-primary-hover text-white ring-1 ring-transparent focus:ring-border-active',
          );
        }
        break;
      case Variant.secondary:
        if (this.disabled()) {
          classes.push('bg-background-neutral-100 text-content-tertiary');
        } else {
          classes.push(
            'bg-background-neutral-50 ring-1 ring-border-default text-content-primary hover:bg-background-neutral-100 hover:ring-border-default focus:ring-border-active',
          );
        }
        break;
      case Variant.tertiary:
        if (this.disabled()) {
          classes.push('bg-background-neutral-100 text-content-tertiary');
        } else {
          classes.push(
            'bg-background-neutral ring-1 ring-transparent text-content-primary hover:bg-background-neutral-100 hover:ring-border-default focus:ring-border-active',
          );
        }
        break;
    }

    return classes.join(' ');
  }
}
