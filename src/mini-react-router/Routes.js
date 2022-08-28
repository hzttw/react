import createRoutesFromChildren from "./creactRoutesFromChildren";
import { useRoutes } from "./hooks";

export default function Routes({ children }) {
   const routes = createRoutesFromChildren(children)

   return useRoutes(routes)
}
