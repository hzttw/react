import { useContext } from "react";
import { NavigationContext } from "./Context";

export function useRoutes(routes) {
  const pathname = window.location.pathname;
  return routes.map((route) => {
    // const match = pathname === route.path || pathname === "/" + route.path;
    // 这里只渲染了 父路由
    const match = pathname.startsWith(route.path)

    //todo 子节点
    return match ? route.element : null;
  });
}

export function useNavigate(params) {
  //跳转
  const {naviagtor} = useContext(NavigationContext)
  return naviagtor.push
}