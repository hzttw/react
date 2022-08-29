import React, { useMemo } from "react";
import { NavigationContext } from "./Context";

export default function Router({ naviagtor, children }) {
  //naviagtor是对象，所以通过useMemo将naviagtor缓存一下
  let navigationContext = useMemo(() => ({ naviagtor }), [naviagtor]);
  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
}
