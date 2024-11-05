import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { StyledInputComponent } from '../styled-input/styled-input.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [NgIf, NgForOf, StyledInputComponent],
  template: `
    <div class="flex flex-col">
      <label [attr.for]="'for'" class="ts-body-3-semibold">{{ label() }}</label>
      <ng-content select="input, select, textarea, [slot=input]"></ng-content>
      <div *ngIf="caption" class="ts-caption">{{ caption() }}</div>
      <!-- Error Display -->
      <ng-container *ngIf="control()?.invalid && control()?.dirty">
        <div class="error" *ngFor="let error of errorMessages">
          {{ error }}
        </div>
      </ng-container>
    </div>
  `,
})
export class FormFieldComponent {
  label = input.required<string>();
  caption = input<string>();
  control = input.required<AbstractControl>();
  get errorMessages(): string[] {
    const control = this.control();
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
  }
}
