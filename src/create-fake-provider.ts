import { PropFn } from './types';

export function createFakeProvider<T extends PropFn<object>>(
  propFn: PropFn<ReturnType<T>>
) {
  return propFn;
}
