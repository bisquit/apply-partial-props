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
