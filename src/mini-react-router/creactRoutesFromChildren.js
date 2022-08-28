import React from "react";
//类比 dom-》vdom
export default function creactRoutesFromChildren(children) {
  const routes = [];

  React.Children.forEach(children, (child) => {
    const route = {
      element: child.props.element,
      path: child.props.path,
    };
    routes.push(route);
  });
  return routes;
}
