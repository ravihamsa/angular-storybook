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

@Component({
  selector: 'app-text-input-wrapper',
  template: `<form [formGroup]="formGroup">
    <app-text-input
      [label]="label()"
      [caption]="caption()"
      [placeholder]="placeholder()"
      [size]="size()"
      [prefixIcon]="prefixIcon()"
      [suffixIcon]="suffixIcon()"
      formControlName="username"
    >
    </app-text-input>
  </form>`,
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
})
class TextInputWrapperComponent implements OnInit {
  value = input<string>('');
  label = input<string>('Label');
  caption = input<string>('Caption');
  placeholder = input<string>('Custom Placeholder');
  size = input<Size>(Size.medium);
  prefixIcon = input<string>('borneo-icon-16-search');
  suffixIcon = input<string>('borneo-icon-16-checkmark');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
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
  protected readonly FormGroup = FormGroup;
}

const meta: Meta<TextInputWrapperComponent> = {
  title: 'Example/Text Input',
  component: TextInputWrapperComponent,
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
} as Meta<TextInputWrapperComponent>;

export default meta;
type Story = StoryObj<TextInputWrapperComponent>;

const renderFn = (args: any) => {
  return {
    props: {
      ...args,
    },
    template: '<form></form>',
  };
};

export const ContainerOnlyMedium = {
  args: {
    value: 'ABC',
    label: 'Label',
    caption: 'Caption',
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-checkmark',
  },
};

export const NoValue = {
  args: {
    label: 'Label',
    caption: 'Caption',
    placeholder: 'Custom Placeholder',
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-checkmark',
  },
};

export const ContainerOnlyLarge = {
  args: {
    size: Size.large,
  },
};

export const ContainerOnlySmall = {
  args: {
    size: Size.small,
  },
};

export const WithLabelAndCaption = {
  args: {
    label: 'Label',
    caption: 'Caption',
  },
};

export const OnlyCaption = {
  args: {
    caption: 'Caption',
  },
};

export const OnlyLabel = {
  args: {
    label: 'Label',
  },
};

export const InputDisabled = {
  args: {
    label: 'Label',
    caption: 'Caption',
    disabled: true,
  },
};

export const WithValidationRequired = {
  args: {
    label: 'Label',
    caption: 'Caption',
    required: true,
  },
};
