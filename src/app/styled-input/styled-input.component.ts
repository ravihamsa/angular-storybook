import { Component, input } from '@angular/core';
import { SizedContainerComponent } from '../sized-container/sized-container.component';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-styled-input',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div [ngClass]="classes" [tabIndex]="isInteractive() ? -1 : null">
      <span [class]="prefixIconClasses">
        <span [class]="prefixIcon()"> </span>
      </span>
      <div class="flex justify-between items-center">
        <input
          type="text"
          placeholder="Enter text"
          [readonly]="disabled()"
          [class]="inputClasses"
          [value]="label()"
        />
        <span [class]="suffixIconClasses">
          <span [class]="suffixIcon()"> </span>
        </span>
      </div>
    </div>
  `,
})
export class StyledInputComponent extends SizedContainerComponent {
  name = input.required<string>();
  get inputClasses() {
    if (this.disabled()) {
      return twMerge(
        super.sizeClasses,
        'w-full ring-0 outline-0 focus:ring-0 bg-background-neutral-300 cursor-not-allowed',
      );
    } else {
      return twMerge(super.sizeClasses, 'w-full ring-0 outline-0 focus:ring-0');
    }
  }
}
