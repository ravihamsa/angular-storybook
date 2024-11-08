import type { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from '../app/inputs/text-input.component';
import { Size } from '../app/sized-container/sized-container.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, computed, input, OnInit } from '@angular/core';
import { SingleSelectInputComponent } from '../app/inputs/single-select-input.component';
import { getStaticDataSource } from '../utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-input-wrapper',
  template: `<form [formGroup]="formGroup" (submit)="onSubmit()">
    <div class="grid grid-cols-3 gap-2">
      <app-single-select-input
        [label]="label()"
        [caption]="caption()"
        [placeholder]="placeholder()"
        [size]="size()"
        [prefixIcon]="prefixIcon()"
        [suffixIcon]="suffixIcon()"
        [dataSource]="dataSource()"
        [canClear]="canClear()"
        formControlName="username"
      >
      </app-single-select-input>
    </div>
    <!--    <button type="submit">click me</button>-->
  </form>`,
  standalone: true,
  imports: [ReactiveFormsModule, SingleSelectInputComponent],
})
class WrapperComponent implements OnInit {
  value = input<string>('');
  label = input<string>('Label');
  caption = input<string>('Caption');
  placeholder = input<string>('Custom Placeholder');
  size = input<Size>(Size.medium);
  prefixIcon = input<string>('borneo-icon-16-search');
  suffixIcon = input<string>('borneo-icon-16-checkmark');
  disabled = input<boolean>(false);
  canClear = input<boolean>(false);
  required = input<boolean>(false);
  dataSource = input<any>();
  formGroup: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      username: [
        {
          value: this.value(),
          disabled: this.disabled(),
        },
        this.required() ? Validators.required : [],
      ],
    });
  }
  onSubmit() {
    console.log(this.formGroup.value);
  }
  protected readonly FormGroup = FormGroup;
}

const meta: Meta<WrapperComponent> = {
  title: 'Example/Single Select Input',
  component: WrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    caption: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    prefixIcon: {
      control: 'select',
      options: [
        '',
        'borneo-icon-16-search',
        'borneo-icon-16-checkmark',
        'borneo-icon-16-plus-in-circle',
        'borneo-icon-16-minus-in-circle',
      ],
    },
    suffixIcon: {
      control: 'select',
      options: [
        '',
        'borneo-icon-16-search',
        'borneo-icon-16-checkmark',
        'borneo-icon-16-plus-in-circle',
        'borneo-icon-16-minus-in-circle',
      ],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} as Meta<WrapperComponent>;

export default meta;
type Story = StoryObj<WrapperComponent>;

const renderFn = (args: any) => {
  return {
    props: {
      ...args,
    },
    template: '<form></form>',
  };
};

export const WithSelection: Story = {
  args: {
    value: '2',
    dataSource: getStaticDataSource(10),
  },
};

export const NoSelection: Story = {
  args: {
    value: '',
    dataSource: getStaticDataSource(10),
    label: 'No Selection',
    placeholder: 'Custom placeholder',
    caption: 'Please select an item',
  },
};

export const CanClear: Story = {
  args: {
    value: '2',
    dataSource: getStaticDataSource(10),
    canClear: true,
  },
};

export const CanClearRequired: Story = {
  args: {
    value: '2',
    dataSource: getStaticDataSource(10),
    canClear: true,
    required: true,
  },
};
