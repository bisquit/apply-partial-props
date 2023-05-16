import { ComponentProps, FunctionComponent } from 'react';

export function applyPartialProps<T extends FunctionComponent<any>>(
  component: T
) {
  return <U extends (...args: any) => any>(propFn: U) =>
    (props: Omit<ComponentProps<T>, keyof ReturnType<U>>) => {
      return component({ ...props, ...propFn() });
    };
}
