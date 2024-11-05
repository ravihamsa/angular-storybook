import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from '../app/form-field/form-field.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StyledInputComponent } from '../app/styled-input/styled-input.component';
import { Size } from '../app/sized-container/sized-container.component';

const meta: Meta<FormFieldComponent> = {
  title: 'Example/Form Field',
  component: FormFieldComponent,
  tags: ['autodocs'],
  imports: [StyledInputComponent],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StyledInputComponent], // Any required modules
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
  },
} as Meta<FormFieldComponent>;

export default meta;
type Story = StoryObj<FormFieldComponent>;

const renderFn = (args: any) => {
  return {
    props: args,
    template: `<form formGroup="">
<app-form-field [control]="control" [caption]="caption" [label]="label">
<app-styled-input [size]="size" name="test" slot="input" label="label" prefixIcon="borneo-icon-16-database" suffixIcon="borneo-icon-12-arrow-down" [isInteractive]="true" [disabled]="control.disabled" [isError]="control.errors"></app-styled-input>
</app-form-field>
</form> `,
  };
};

export const WithCaptionAndLabelLarge: Story = {
  args: {
    control: new FormControl(
      {
        value: 'test',
        disabled: false,
      },
      Validators.required,
    ),
    caption: 'Caption',
    label: 'Label',
    size: Size.large,
  },
  render: renderFn,
};

export const WithCaptionAndLabelMedium: Story = {
  args: {
    control: new FormControl(''),
    caption: 'Caption',
    label: 'Label',
    size: Size.medium,
  },
  render: renderFn,
};

export const WithCaptionAndLabelSmall: Story = {
  args: {
    control: new FormControl(''),
    caption: 'Caption',
    label: 'Label',
    size: Size.small,
  },
  render: renderFn,
};

export const WithCaptionAndLabelAndDisabled: Story = {
  args: {
    control: new FormControl({
      value: 'test',
      disabled: true,
    }),
    caption: 'Caption',
    label: 'Label',
    size: Size.small,
  },
  render: renderFn,
};

export const WithCaptionAndLabelAndError: Story = {
  args: {
    control: new FormControl('', Validators.required),
    caption: 'Caption',
    label: 'Label',
    size: Size.small,
  },
  render: renderFn,
};

export const ContainerOnly: Story = {
  args: {
    control: new FormControl(''),
    size: Size.medium,
  },
  render: renderFn,
};

export const LabelOnly: Story = {
  args: {
    control: new FormControl(''),
    label: 'Label',
    size: Size.medium,
  },
  render: renderFn,
};

export const CaptionOnly: Story = {
  args: {
    control: new FormControl(''),
    caption: 'Caption',
    size: Size.medium,
  },
  render: renderFn,
};
