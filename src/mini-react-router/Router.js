import React, { useMemo } from "react";
import { NavigationContext } from "./Context";

export default function Router({ naviagtor, children,location }) {
  //naviagtor是对象，所以通过useMemo将naviagtor缓存一下
  let navigationContext = useMemo(() => ({ naviagtor ,location}), [naviagtor,location]);
  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
}
