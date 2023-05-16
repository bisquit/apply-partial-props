import { ComponentProps, FunctionComponent } from "react";
import ProjectSearch, { ProjectSearchProps } from "./ProjectSearch";
import useProjectSearch from "./useProjectSearch";

// iteration 1 (export presentation)
// export default ProjectSearch;

// iteration 2 (export "container" that apply hook's value)
// export default function({ requiredArg, perPage }: { requiredArg: string; perPage?: number }) {
//   const props = useProjectSearch();
//   return ProjectSearch({ requiredArg, perPage, ...props });
// }

// iteration 3 (infer types)
// type componentProps = ComponentProps<typeof ProjectSearch>;
// type hookReturn = ReturnType<typeof useProjectSearch>;
// type Props = Omit<componentProps, keyof hookReturn>;
// export default function(props: Props) {
//   const rest = useProjectSearch();
//   return ProjectSearch({ ...props, ...rest });
// }

// iteration 4 (use function, connecting presentation and hook)
// function connect<T extends FunctionComponent<any>, U extends (...args: any) => any>(component: T, hook: U) {
//   return (props: Omit<ComponentProps<T>, keyof ReturnType<U>>) => {
//     return component({...props, ...hook()})
//   }
// }
// export default connect(ProjectSearch, useProjectSearch);

// iteration 5 (merge multiple hooks)
function applyHook<T extends FunctionComponent<any>>(component: T) {
  return <U extends (...args: any) => any>(hook: U) => 
    (props: Omit<ComponentProps<T>, keyof ReturnType<U>>) => {
      return component({...props, ...hook()})
    }
}

function useRequiredArg() {
  return {
    requiredArg: '100',
  } satisfies Partial<ProjectSearchProps>;
}

export default applyHook(ProjectSearch)(() => ({...useProjectSearch(), ...useRequiredArg()}));
