import { useCallback, useContext, useMemo } from "react";
import { matchPath, matchRoutes } from "react-router-dom";
import { NavigationContext, RouteContext } from "./Context";
// import Outlet from "./Outlet";
// import { normalizePathname } from "./utlis";

export function useRoutes(routes) {
  const location = useLocation();
  const pathname = location.pathname;

  const matches = matchRoutes(routes, { pathname });
  return renderMetches(matches);
  // return routes.map((route) => {
  //   // const match = pathname === route.path || pathname === "/" + route.path;
  //   // 这里只渲染了 父路由
  //   const match = pathname.startsWith(route.path);

  //   // return match ? route.element : null;

  //   //todo 子节点
  //   return (
  //     match &&
  //     route.children.map((child) => {
  //       let m = normalizePathname(child.path) === pathname;
  //       return (
  //         m && (
  //           <RouteContext.Provider
  //             value={{ outlet: child.element }}
  //             children={
  //               route.element !== undefined ? route.element : <Outlet></Outlet>
  //             }
  //           ></RouteContext.Provider>
  //         )
  //       );
  //     })
  //   );
  // });
}

export function useNavigate() {
  //跳转
  const { naviagtor } = useContext(NavigationContext);
  const navigate = useCallback(
    (to, options = {}) => {
      if (typeof to === "number") {
        naviagtor.go(to);
        return;
      }
      (!!options.replace ? naviagtor.replace : naviagtor.push)(
        to,
        options.state
      );
    },
    [naviagtor]
  );
  return navigate;
}

export function useLocation() {
  const { location } = useContext(NavigationContext);
  return location;
}

//这个hook主要就是渲染children
export function useOutlet() {
  const { outlet } = useContext(RouteContext);
  return outlet;
}

function renderMetches(matches) {
  if (matches === null) {
    return null;
  }
  //reduceRight与reduce区别在于reduce从数组头部遍历，reduceRight从数组尾部遍历
  return matches.reduceRight((outlet, match) => {
    return (
      <RouteContext.Provider
        value={{ outlet, matches }}
        children={match.route.element || outlet}
      ></RouteContext.Provider>
    );
  }, null);
}
export function useParams() {
  const { matches } = useContext(RouteContext);
  const routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}

export function useMatch(pattern) {
  const { pathname } = useLocation();
  return useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}
export function useResolvedPath(to) {
  const { pathname } = useLocation();
  return useMemo(() => ({
    pathname: to,
    hash: "",
    search: "",
  }),[pathname]);
}
