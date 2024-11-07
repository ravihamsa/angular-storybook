import { Component, input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { TextInputComponent } from './inputs/text-input.component';

interface Option {
  value: string;
  label: string;
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
        <app-text-input formControlName="username" />
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
