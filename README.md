Container hook example

Inspired by https://github.com/helloitsjoe/react-hooks-compose

## Usage example

Presentational

```tsx
export type ProjectSearchProps = {
  requiredArg: string;
  perPage?: number;
  options?: string[];
  onKeywordChange?: (v: string) => void;
}

export default function ProjectSearch({ requiredArg, perPage = 10, options = [], onKeywordChange = () => {} }: ProjectSearchProps) {
  return (
    <>
      <div>ProjectSearch component</div>
      <p>requiredArg: {requiredArg}</p>
      <p>perPage: {perPage}</p>
      <div>{options.map(v => <p>{v}</p>)}</div>
      <input onChange={(e) => onKeywordChange(e.target.value)}></input>
    </>
  )
}
```

Hook

```tsx
import { useState } from "react";
import { ProjectSearchProps } from "./ProjectSearch";

const mockApi = async (v: string) => {
  return new Promise<string[]>(resolve => {
    setTimeout(() => resolve(Array(v.length).fill(v)), 2000);
  })
}

export default function useProjectSearch() {
  const [options, setOptions] = useState<string[]>([]);

  const onKeywordChange = async (v: string) => {
    const res = await mockApi(v);
    setOptions(res);
  }

  return {
    options,
    onKeywordChange,
  } satisfies Partial<ProjectSearchProps>;
}

```

Apply hook to presentational

```tsx
export default applyHook(ProjectSearch)(useProjectSearch);
```

```tsx
// Prop types are narrowed
<ProjectSearch requiredArg='1' perPage={8}/>
```

see [applyHook.ts](src/common/applyHook.ts)
