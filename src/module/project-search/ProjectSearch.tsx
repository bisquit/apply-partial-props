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
