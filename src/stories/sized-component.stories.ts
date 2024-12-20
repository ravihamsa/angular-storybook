import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  Size,
  SizedContainerComponent,
} from '../app/sized-container/sized-container.component';
import { BorneoIcon } from '../types/iconType';
import { StyledInputComponent } from '../app/styled-input/styled-input.component';
import { SizedTemplateDirective } from '../directives/sized-template.directive';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SizedContainerComponent> = {
  title: 'Example/SizedContainer',
  component: SizedContainerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [SizedTemplateDirective], // Any required modules
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    prefixIcon: {
      control: 'select',
      options: [
        'borneo-icon-16-plus-in-circle',
        'borneo-icon-16-minus-in-circle',
      ],
    },
    suffixIcon: {
      control: 'select',
      options: [
        'borneo-icon-16-plus-in-circle',
        'borneo-icon-16-minus-in-circle',
      ],
    },
    disabled: {
      control: 'boolean',
    },
    isInteractive: {
      control: 'boolean',
    },
    isError: {
      control: 'boolean',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<SizedContainerComponent>;

const renderFn = ({
  size,
  prefixIcon,
  suffixIcon,
  label,
  isInteractive,
  disabled,
  isError,
  customClass = '',
}: {
  size: Size;
  suffixIcon?: BorneoIcon;
  prefixIcon?: BorneoIcon;
  label?: string;
  isInteractive?: boolean;
  disabled?: boolean;
  isError?: boolean;
  customClass?: string;
}) => ({
  props: {
    size,
    suffixIcon,
    prefixIcon,
    label,
    isInteractive,
    disabled,
    isError,
    customClass,
  },
  template: `<app-sized-container [size]="size" [suffixIcon]="suffixIcon" [prefixIcon]="prefixIcon" [label]="label" [isInteractive]="isInteractive" [disabled]="disabled" [isError]="isError" [customClass]="customClass"></app-sized-container>`,
});

const renderFunWithTemplate = (args: any) => {
  return {
    props: {
      ...args,
      log: (e: Event) => {
        console.log('clicked', e);
      },
    },
    template: `<app-sized-container
      [label]="label"
      isInteractive="true"
    >
      <ng-template sizedTemplate="content">
        <input type="text" placeholder="Enter text" class="outline-0" />
      </ng-template>
      <ng-template sizedTemplate="prefix">
        <button (click)="log($event)" class="mr-2">prefix</button>
      </ng-template>
      <ng-template sizedTemplate="suffix">
        <button (click)="log($event)" class="ml-2">suffix</button>
      </ng-template>
    </app-sized-container>`,
  };
};

export const Large: Story = {
  args: {
    size: Size.large,
    label: 'Large',
  },
  render: renderFn,
};

export const Medium: Story = {
  args: {
    size: Size.medium,
    label: 'Medium',
  },
  render: renderFn,
};

export const Small: Story = {
  args: {
    size: Size.small,
    label: 'Small',
  },
  render: renderFn,
};

export const LargeLeftIcon: Story = {
  args: {
    size: Size.large,
    prefixIcon: 'borneo-icon-16-search',
    label: 'Large Left Icon',
  },
  render: renderFn,
};

export const MediumLeftIcon: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-search',
    label: 'Medium Left Icon',
  },
  render: renderFn,
};

export const SmallLeftIcon: Story = {
  args: {
    size: Size.small,
    prefixIcon: 'borneo-icon-16-search',
    label: 'Small Left Icon',
  },
  render: renderFn,
};

export const LargeRightIcon: Story = {
  args: {
    size: Size.large,
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Large Right Icon',
  },
  render: renderFn,
};

export const MediumRightIcon: Story = {
  args: {
    size: Size.medium,
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Medium Right Icon',
  },
  render: renderFn,
};

export const SmallRightIcon: Story = {
  args: {
    size: Size.small,
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Small Right Icon',
  },
  render: renderFn,
};

export const LargeJustIcon: Story = {
  args: {
    size: Size.large,
    prefixIcon: 'borneo-icon-16-arrow-down',
  },
  render: renderFn,
};

export const MediumJustIcon: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-arrow-down',
  },
  render: renderFn,
};

export const SmallJustIcon: Story = {
  args: {
    size: Size.small,
    prefixIcon: 'borneo-icon-16-arrow-down',
  },
  render: renderFn,
};

export const LargeBothIcons: Story = {
  args: {
    size: Size.large,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Large Both Icons Interactive',
    isInteractive: true,
  },
  render: renderFn,
};

export const MediumBothIcons: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Medium Both Icons Interactive',
    isInteractive: true,
  },
  render: renderFn,
};

export const SmallBothIcons: Story = {
  args: {
    size: Size.small,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Small Both Icons Interactive',
    isInteractive: true,
  },
  render: renderFn,
};

export const LargeBothIconsDisabled: Story = {
  args: {
    size: Size.large,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Large Both Icons Interactive',
    isInteractive: true,
    disabled: true,
  },
  render: renderFn,
};

export const LargeBothIconsError: Story = {
  args: {
    size: Size.large,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Large Both Icons Interactive',
    isInteractive: true,
    isError: true,
  },
  render: renderFn,
};

export const LargeBothIconsCustomClass: Story = {
  args: {
    size: Size.large,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Large Both Icons Custom class',
    customClass: 'bg-red-500 text-white',
  },
  render: renderFn,
};

export const ContainerWithTemplates: Story = {
  args: {
    size: Size.large,
    label: 'ContainerWithTemplates',
  },
  render: renderFunWithTemplate,
};
