import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { StyledInputComponent } from '../styled-input/styled-input.component';
import { Size } from '../sized-container/sized-container.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [NgIf, NgForOf, StyledInputComponent],
  template: `
    <div class="flex flex-col gap-1">
      <label [attr.for]="'for'" class="ts-body-3-semibold">{{ label() }}</label>
      <ng-content select="input, select, textarea, [slot=input]"></ng-content>
      <div *ngIf="caption" class="ts-caption">{{ caption() }}</div>
      <!-- Error Display -->
      <ng-container *ngIf="control()?.invalid && control()?.dirty">
        <div class="error" *ngFor="let error of errorMessages()">
          {{ error }}
        </div>
      </ng-container>
    </div>
  `,
})
export class FormFieldComponent {
  label = input.required<string>();
  size = input(Size.medium);
  caption = input<string>();
  control = input.required<AbstractControl>();
  errorMessages = computed(() => {
    const control = this.control();
    console.log(control);
    if (!control || !control.errors) return [];

    return Object.keys(control.errors).map((key) => {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          const minLengthConfig = control.errors?.['minlength'];
          return `Minimum length is ${minLengthConfig?.requiredLength}`;
        case 'maxlength':
          const maxLengthConfig = control.errors?.['maxlength'];
          return `Maximum length is ${maxLengthConfig?.requiredLength}`;
        // Add more case statements as necessary
        default:
          return 'Invalid input';
      }
    });
  });
}
