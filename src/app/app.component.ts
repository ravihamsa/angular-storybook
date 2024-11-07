import { Component, forwardRef, input, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {
  Size,
  SizedContainerComponent,
} from './sized-container/sized-container.component';
import { SizedTemplate } from '../directives/sized-template';

interface Option {
  value: string;
  label: string;
}
@Component({
  selector: 'app-form-field',
  standalone: true,
  template: `
    <div class="p-4">
      <label class="text-lg font-bold">{{ label }}</label>
      <ng-content></ng-content>
      <div class="text-sm text-gray-500">{{ caption }}</div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent<T> implements ControlValueAccessor, OnInit {
  log = (event: any) => {
    console.log(event);
  };
  value = input<T>();
  caption = input<string>();
  label = input<string>();
  control = input<FormControl<T>>();
  name = input<string>('no-name');

  valueCopy = signal<T | undefined>(undefined);
  onChange = (value: T) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: T): void {
    this.valueCopy.set(value);
  }

  ngOnInit(): void {
    this.valueCopy.set(this.value());
  }
  onInput(event: Event): void {
    console.log('onInput');
    const input = event.target as HTMLInputElement;
    this.valueCopy.set(input.value as T);
    this.onChange(this.valueCopy() as T); // Notify Angular form of the change
    this.onTouched(); // Mark as touched
  }
}

@Component({
  selector: 'text-input',
  standalone: true,
  template: `
    <app-sized-container
      [label]="valueCopy()"
      prefixIcon="borneo-icon-16-clear-gray"
      suffixIcon="borneo-icon-16-clear-gray"
      customClass="bg-gray-100 w-full"
      [size]="Size.small"
    >
      <ng-template sizedTemplate="content">
        <input
          type="text"
          [value]="valueCopy()"
          (input)="onInput($event); log($event)"
        />
      </ng-template>
      <ng-template sizedTemplate="prefix">
        <button (click)="log($event)" type="button">prefix</button>
      </ng-template>
      <ng-template sizedTemplate="suffix">
        <button (click)="log($event)" type="button">suffix</button>
      </ng-template>
    </app-sized-container>
  `,
  imports: [ReactiveFormsModule, SizedContainerComponent, SizedTemplate],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
})
export class TextInputComponent extends FormFieldComponent<string> {
  protected readonly Size = Size;
}

@Component({
  selector: 'select-input',
  standalone: true,
  template: `
    <select [value]="valueCopy()" (change)="onInput($event)">
      <option
        *ngFor="let option of options()"
        [value]="option.value"
        [selected]="valueCopy() === option.value"
      >
        {{ option.label }}
      </option>
    </select>
  `,
  imports: [ReactiveFormsModule, NgForOf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectInputComponent,
      multi: true,
    },
  ],
})
export class SelectInputComponent extends FormFieldComponent<string> {
  options = input<Option[]>([]);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
  ],
  template: `
    <form [formGroup]="loginForm" (submit)="onSubmit()">
      <div class="flex col-span-2 gap-2">
        <text-input formControlName="username" />
        <select-input formControlName="password" [options]="options" />
        <button type="submit">Submit</button>
      </div>
    </form>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: NonNullableFormBuilder) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['myusername', Validators.required],
      password: ['2', Validators.required],
    });
  }
  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];
  onSubmit() {
    console.log('meow');
    console.log(this.loginForm.value);
  }
  title = 'my-angular-storybook-project';
}
