# apply-partial-props

Create partially applied components.

## Usage example

Presentational

```tsx
export type ProjectSearchProps = {
  requiredArg: string;
  options?: string[];
  onKeywordChange?: (v: string) => void;
};

export default function ProjectSearch({
  requiredArg,
  options = [],
  onKeywordChange = () => {},
}: ProjectSearchProps) {
  return (
    <>
      <div>ProjectSearch component</div>
      <div>
        {options.map((v) => (
          <p>{v}</p>
        ))}
      </div>
      <input onChange={(e) => onKeywordChange(e.target.value)}></input>
    </>
  );
}
```

Prop provider (such as Hooks)

```tsx
import { useState } from 'react';
import { ProjectSearchProps } from './ProjectSearch';

const mockApi = async (v: string) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(Array(v.length).fill(v)), 2000);
  });
};

export default function useProjectSearch() {
  const [options, setOptions] = useState<string[]>([]);

  const onKeywordChange = async (v: string) => {
    const res = await mockApi(v);
    setOptions(res);
  };

  return {
    options,
    onKeywordChange,
  } satisfies Partial<ProjectSearchProps>;
}
```

Apply provider's props to presentational

```tsx
export const ProjectSearchContainer =
  applyPartialProps(ProjectSearch)(useProjectSearch);
```

```tsx
// Prop types are now narrowed
<ProjectSearchContainer requiredArg="1" />
```

Overall structure is like this

```bash
project-search/
  ├── ProjectSearch.tsx         # Presentational
  ├── ProjectSearch.stories.tsx
  ├── ProjectSearch.test.ts
  ├── index.tsx                 # export "Container" that apply hook to presentational
  └── useProjectSearch.ts       # Hook (formerly container)
```

## Prior Art

- https://github.com/helloitsjoe/react-hooks-compose
