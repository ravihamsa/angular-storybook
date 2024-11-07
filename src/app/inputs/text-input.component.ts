import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SizedContainerComponent } from '../sized-container/sized-container.component';
import { SizedTemplateDirective } from '../../directives/sized-template.directive';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ControlWrapperComponent } from './control-wrapper.component';
import { isError } from 'lodash';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-text-input',
  standalone: true,
  template: `
    <app-control-wrapper [label]="label()" [caption]="caption()">
      <app-sized-container
        [size]="size()"
        [suffixIcon]="suffixIcon()"
        [prefixIcon]="prefixIcon()"
        [isInteractive]="true"
        [disabled]="formControl?.disabled === true"
        [isError]="formControl?.invalid === true"
      >
        <ng-template sizedTemplate="content">
          <input
            type="text"
            [readOnly]="formControl?.disabled"
            [placeholder]="placeholder()"
            [value]="valueCopy() ? valueCopy() : ''"
            (input)="onInput($event); log($event); log(formControl)"
            [class]="inputClasses"
            (blur)="onTouched()"
          />
        </ng-template>
      </app-sized-container>
    </app-control-wrapper>
  `,
  imports: [
    ReactiveFormsModule,
    SizedContainerComponent,
    SizedTemplateDirective,
    ControlWrapperComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
})
export class TextInputComponent extends FormFieldComponent<string> {
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
}
