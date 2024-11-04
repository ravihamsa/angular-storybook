import type { Meta, StoryObj } from '@storybook/angular';
import { ValueDisplayComponent } from '../app/value-display/value-display.component';
import { Observable } from 'rxjs';
import { ItemListComponent } from '../app/item-list/item-list.component';
import { getStaticDataSource } from '../utils';
import { SingleSelectListComponent } from '../app/single-select-list/single-select-list.component';

const meta: Meta<SingleSelectListComponent> = {
  title: 'Example/Single Select',
  component: SingleSelectListComponent,
  tags: ['autodocs'],
} as Meta<SingleSelectListComponent>;

export default meta;
type Story = StoryObj<SingleSelectListComponent>;

export const IdValue: Story = {
  args: {
    values: ['2'],
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
