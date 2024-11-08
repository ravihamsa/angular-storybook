import {
  AfterViewInit,
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import { Size } from '../sized-container/sized-container.component';
import { NgIf } from '@angular/common';
import { BorneoIcon } from '../../types/iconType';

@Component({
  selector: 'app-form-field',
  standalone: true,
  template: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
  imports: [NgIf],
})
export class FormFieldComponent<T>
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  log = (event: any) => {
    console.log(event);
  };
  injector = inject(Injector);
  placeholder = input<string>('Enter Text');
  value = input<T>();
  caption = input<string>();
  label = input<string>();
  name = input<string>('no-name');
  size = input<Size>(Size.medium);
  prefixIcon = input<BorneoIcon>();
  suffixIcon = input<BorneoIcon>();
  isError = input<boolean>(false);

  valueCopy = signal<T | undefined>(undefined);
  onChange = (value: T) => {};
  onTouched = () => {};
  formControl: FormControl<T> | null = null;

  constructor() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: T): void {
    if (value) {
      this.valueCopy.set(value);
    } else {
      this.valueCopy.set(undefined);
    }
  }

  ngOnInit(): void {
    this.valueCopy.set(this.value());
  }
  ngAfterViewInit() {
    const model = this.injector.get(NgControl);
    this.formControl = model.control as FormControl<T>;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueCopy.set(input.value as T);
    this.onChange(this.valueCopy() as T); // Notify Angular form of the change
  }

  protected readonly Validators = Validators;
}
