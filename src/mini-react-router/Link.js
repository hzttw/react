import { useNavigate } from "./hooks";

export default function Link({ to, children ,...rest}) {
  const navigate = useNavigate()
  const handle = (e) => {
    //这里阻止原生事件，a标签的href 会刷新页面
    e.preventDefault();
    //这里将跳转交给navigate来处理
    navigate(to)
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
