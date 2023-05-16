import { ComponentProps, FunctionComponent } from 'react';
import { PropFn } from './types';

export function applyPartialProps<T extends FunctionComponent<any>>(
  component: T
) {
  return <U extends PropFn<Partial<ComponentProps<T>>>>(propFn: U) =>
    (props: Omit<ComponentProps<T>, keyof ReturnType<U>>) => {
      return component({ ...props, ...propFn() });
    };
}
