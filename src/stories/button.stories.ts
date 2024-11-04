import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { ButtonComponent, Variant } from '../app/button/button.component';
import { Size } from '../app/sized-container/sized-container.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Example/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
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
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { click: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const PrimaryLarge: Story = {
  args: {
    label: 'Button label',
    size: Size.large,
    variant: Variant.primary,
  },
};

export const PrimaryMedium: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    variant: Variant.primary,
  },
};
export const PrimarySmall: Story = {
  args: {
    label: 'Button label',
    size: Size.small,
    variant: Variant.primary,
  },
};

export const PrimaryLeftIcon: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.primary,
  },
};
export const PrimaryRightIcon: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    suffixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.primary,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    label: 'Button label',
    variant: Variant.primary,
    disabled: true,
  },
};

// generate similar stories for the other variants
export const SecondaryLarge: Story = {
  args: {
    label: 'Button label',
    size: Size.large,
    variant: Variant.secondary,
  },
};

export const SecondaryMedium: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    variant: Variant.secondary,
  },
};

export const SecondarySmall: Story = {
  args: {
    label: 'Button label',
    size: Size.small,
    variant: Variant.secondary,
  },
};

export const SecondaryLeftIcon: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.secondary,
  },
};

export const SecondaryRightIcon: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    suffixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.secondary,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    label: 'Button label',
    variant: Variant.secondary,
    disabled: true,
  },
};

export const TertiaryLarge: Story = {
  args: {
    label: 'Button label',
    size: Size.large,
    variant: Variant.tertiary,
  },
};

export const TertiaryMedium: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    variant: Variant.tertiary,
  },
};

export const TertiarySmall: Story = {
  args: {
    label: 'Button label',
    size: Size.small,
    variant: Variant.tertiary,
  },
};

export const TertiaryLeftIcon: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.tertiary,
  },
};

export const TertiaryRightIcon: Story = {
  args: {
    label: 'Button label',
    size: Size.medium,
    suffixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.tertiary,
  },
};

export const TertiaryDisabled: Story = {
  args: {
    label: 'Button label',
    variant: Variant.tertiary,
    disabled: true,
  },
};

export const IconOnlyPrimary: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.primary,
  },
};

export const IconOnlySecondary: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.secondary,
  },
};

export const IconOnlyTertiary: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-plus-in-circle',
    variant: Variant.tertiary,
  },
};
