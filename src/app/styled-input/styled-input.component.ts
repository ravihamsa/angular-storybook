import { Component, input } from '@angular/core';
import { SizedContainerComponent } from '../sized-container/sized-container.component';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
          class="w-full"
          [formControlName]="name()"
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
}
