import { ComponentProps, FunctionComponent } from "react";

export function applyHook<T extends FunctionComponent<any>>(component: T) {
  return <U extends (...args: any) => any>(hook: U) => 
    (props: Omit<ComponentProps<T>, keyof ReturnType<U>>) => {
      return component({...props, ...hook()})
    }
}
