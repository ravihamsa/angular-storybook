import type { Meta, StoryObj } from '@storybook/angular';
import { ValueDisplayComponent } from '../app/value-display/value-display.component';
import { Observable } from 'rxjs';
import { ItemListComponent } from '../app/item-list/item-list.component';
import { getStaticDataSource } from '../utils';

const meta: Meta<ItemListComponent> = {
  title: 'Example/Item List',
  component: ItemListComponent,
  tags: ['autodocs'],
} as Meta<ItemListComponent>;

export default meta;
type Story = StoryObj<ItemListComponent>;

export const IdValue: Story = {
  args: {
    values: ['2'],
    dataSource: getStaticDataSource(10),
  },
};

export const MultipleValues: Story = {
  args: {
    values: ['1', '2'],
    dataSource: getStaticDataSource(10),
  },
};

export const NoValues: Story = {
  args: {
    values: [],
    dataSource: getStaticDataSource(10),
  },
};

export const AsyncDataSource: Story = {
  args: {
    values: ['1'],
    dataSource: new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStaticDataSource(10));
      }, 1000);
    }),
  },
};

export const ObservableDataSource: Story = {
  args: {
    values: ['3'],
    dataSource: new Observable((observer) => {
      observer.next(getStaticDataSource(10));
    }),
  },
};
