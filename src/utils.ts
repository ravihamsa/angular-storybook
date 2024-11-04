import { SelectionModel } from '@angular/cdk/collections';
import isEqual from 'lodash/isEqual';

export const getStaticDataSource = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    value: i.toString(),
    label: `Item ${i}`,
  }));
};

export const getSingleSelectModel = () => {
  return new SelectionModel<any>(false, [], true, isEqual);
};

export const getMultiSelectModel = () => {
  return new SelectionModel<any>(true, [], true, isEqual);
};
