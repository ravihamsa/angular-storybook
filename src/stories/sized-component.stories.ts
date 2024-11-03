import type { Meta, StoryObj } from '@storybook/angular';
import {
  Size,
  SizedContainerComponent,
} from '../app/sized-container/sized-container.component';
import { BorneoIcon } from '../types/iconType';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SizedContainerComponent> = {
  title: 'Example/SizedContainer',
  component: SizedContainerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
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
}: {
  size: Size;
  suffixIcon?: BorneoIcon;
  prefixIcon?: BorneoIcon;
  label?: string;
}) => ({
  props: {
    size,
    suffixIcon,
    prefixIcon,
    label,
  },
  template: `<app-sized-container [size]="size" [suffixIcon]="suffixIcon" [prefixIcon]="prefixIcon" [label]="label" ></app-sized-container>`,
});

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
    label: 'Large Both Icons',
  },
  render: renderFn,
};

export const MediumBothIcons: Story = {
  args: {
    size: Size.medium,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Medium Both Icons',
  },
  render: renderFn,
};

export const SmallBothIcons: Story = {
  args: {
    size: Size.small,
    prefixIcon: 'borneo-icon-16-search',
    suffixIcon: 'borneo-icon-16-arrow-down',
    label: 'Small Both Icons',
  },
  render: renderFn,
};
