// ProjectSearch.tsx
type ProjectSearchProps = {
  perPage?: number;
  options?: any[];
  onKeywordChange?: (v: string) => void;
}

export default function ProjectSearch({ perPage, options, onKeywordChange }: ProjectSearchProps) {
  return (
    <div>...</div>
  )
}

// use-project-search.ts
export default function useProjectSearch() {
  const [options, setOptions] = useState([]);

  const onKeywordChange = async (v: string) => {
    const res = await api.get(v);
    setOptions(res.options);
  }

  return {
    options,
    onKeywordChange,
  } satisfies ProjectSearchProps;
}

// index.ts

// raw.1
export default function({ perPage }) {
  const props = useProjectSearch();
  return ProjectSearch({ perPage, ...props });
}

// raw.2
type Props = Omit<ComponentProps<ProjectSearch>, ReturnType<useProjectSearch>>
export default function(props: Props) {
  const props = useProjectSearch();
  return ProjectSearch({ perPage, ...props });
}

// raw.3
function connect<T, U>(component: T, hook: U) {
  return (props: Omit<ComponentProps<T>, ReturnType<U>>) => {
    return component(...hook());
  }
}
