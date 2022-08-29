import { useContext } from "react";
import { NavigationContext, RouteContext } from "./Context";
import Outlet from "./Outlet";
import { normalizePathname } from "./utlis";

export function useRoutes(routes) {
  const location = useLocation()
  const pathname = location.pathname;
  return routes.map((route) => {
    // const match = pathname === route.path || pathname === "/" + route.path;
    // 这里只渲染了 父路由
    const match = pathname.startsWith(route.path);

    // return match ? route.element : null;

    //todo 子节点
    return (
      match &&
      route.children.map((child) => {
        let m = normalizePathname(child.path) === pathname;
        return (
          m && (
            <RouteContext.Provider
              value={{ outlet: child.element }}
              children={
                route.element !== undefined ? route.element : <Outlet></Outlet>
              }
            ></RouteContext.Provider>
          )
        );
      })
    );
  });
}

export function useNavigate() {
  //跳转
  const { naviagtor } = useContext(NavigationContext);
  return naviagtor.push;
}

export function useLocation() {
  const { location } = useContext(NavigationContext);
  return location;
}

//这个hook主要就是渲染children
export function useOutlet() {
  const  {outlet} = useContext(RouteContext)
  return outlet
}
