import { SelectionModel } from '@angular/cdk/collections';
import isEqual from 'lodash/isEqual';

export const getStaticDataSource = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    value: i.toString(),
    label: `Item ${i}`,
  }));
};

export const getSingleSelectModel = (initialValue: string) => {
  return new SelectionModel(false, [initialValue], true, isEqual);
};

export const getMultiSelectModel = (initialValues: string[]) => {
  return new SelectionModel(true, initialValues, true, isEqual);
};
