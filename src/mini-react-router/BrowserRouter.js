import { useRef } from "react";
import { createBrowserHistory } from "_history@5.3.0@history";
import Router from "./Router";

export default function BrowserRouter({ children }) {
  //因为是函数组件，每次调用都会创建一个history 所以必须存起来 使用useRef
  let historyRef = useRef()
  if (historyRef.current ==null) {
    historyRef.current = createBrowserHistory()
  }
  const history = historyRef.current
  return <Router children={children} naviagtor={history}></Router>;
}
