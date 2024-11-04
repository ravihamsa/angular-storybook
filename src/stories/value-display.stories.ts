import type { Meta, StoryObj } from '@storybook/angular';
import { ValueDisplayComponent } from '../app/value-display/value-display.component';
import { Observable } from 'rxjs';

const meta: Meta<ValueDisplayComponent> = {
  title: 'Example/Value Display',
  component: ValueDisplayComponent,
  tags: ['autodocs'],
} as Meta<ValueDisplayComponent>;

export default meta;
type Story = StoryObj<ValueDisplayComponent>;

export const IdValue: Story = {
  args: {
    values: ['123456'],
    dataSource: [
      {
        value: '123456',
        label: 'Item 1',
      },
      {
        value: '789012',
        label: 'Item 2',
      },
    ],
  },
};

export const MultipleValues: Story = {
  args: {
    values: ['123456', '789012'],
    dataSource: [
      {
        value: '123456',
        label: 'Item 1',
      },
      {
        value: '789012',
        label: 'Item 2',
      },
    ],
  },
};

export const NoValues: Story = {
  args: {
    values: [],
    dataSource: [
      {
        value: '123456',
        label: 'Item 1',
      },
      {
        value: '789012',
        label: 'Item 2',
      },
    ],
  },
};

export const AsyncDataSource: Story = {
  args: {
    values: ['123456'],
    dataSource: new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            value: '123456',
            label: 'Item 1',
          },
          {
            value: '789012',
            label: 'Item 2',
          },
        ]);
      }, 1000);
    }),
  },
};

export const ObservableDataSource: Story = {
  args: {
    values: ['123456'],
    dataSource: new Observable((observer) => {
      observer.next([
        {
          value: '123456',
          label: 'Item 1',
        },
        {
          value: '789012',
          label: 'Item 2',
        },
      ]);
    }),
  },
};
