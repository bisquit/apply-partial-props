import ProjectSearch from "./ProjectSearch";
import useProjectSearch from "./useProjectSearch";
import { applyHook } from "../../common/applyHook";

export default applyHook(ProjectSearch)(useProjectSearch);
