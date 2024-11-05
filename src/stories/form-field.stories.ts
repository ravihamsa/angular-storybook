import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ValueDisplayComponent } from '../app/value-display/value-display.component';
import { Observable } from 'rxjs';
import { ItemListComponent } from '../app/item-list/item-list.component';
import { getStaticDataSource } from '../utils';
import { SingleSelectListComponent } from '../app/single-select-list/single-select-list.component';
import { FormFieldComponent } from '../app/form-field/form-field.component';
import { AbstractControl, FormControl } from '@angular/forms';
import { StyledInputComponent } from '../app/styled-input/styled-input.component';

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
} as Meta<FormFieldComponent>;

export default meta;
type Story = StoryObj<FormFieldComponent>;

const renderFn = (args: Story['args']) => {
  return {
    props: args,
    template: `<app-form-field [control]="control" [caption]="caption" [label]="label">
<app-styled-input name="test" slot="input" label="label"></app-styled-input>
</app-form-field>  `,
  };
};

export const WithCaptionAndLabel: Story = {
  args: {
    control: new FormControl({
      value: '1',
      disabled: false,
    }),
    caption: 'Caption',
    label: 'Label',
  },
  render: renderFn,
};
