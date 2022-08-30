import React from "react";
//类比 dom-》vdom
export default function creactRoutesFromChildren(children) {
  const routes = [];

  React.Children.forEach(children, (child) => {
    const route = {
      element: child.props.element,
      path: child.props.path,
    };
    if (child.props.children) {
      //判断child是否还有子节点，是否是嵌套路由 如果是的话 给route添加 children属性 继续遍历
      //route arr
      route.children = creactRoutesFromChildren(child.props.children)
    }
    routes.push(route);
  });
  return routes;
  
}
