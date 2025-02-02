import "./App.css";
import React from "react";
import { AuthProvider, useAuth } from "./auth";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useNavigate,
//   useParams,
//   Navigate, useLocation,useMatch, useResolvedPath
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
  useMatch,useResolvedPath
} from "./mini-react-router";
// import About from "./pages/About";
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="product" element={<Product />}>
                <Route path=":id" element={<ProductDetail />}></Route>
              </Route>
              <Route
                path="user"
                element={
                  <RequireAuth>
                    <User />
                  </RequireAuth>
                }
              ></Route>
              <Route path="login" element={<Login />}></Route>
              <Route
                path="about"
                element={
                  <React.Suspense fallback={<h1>loading...</h1>}>
                    <About />
                  </React.Suspense>
                }
              ></Route>
              <Route path="*" element={<NoMatch />}></Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

function CustomLink({ to, ...rest }) {
  const resovled = useResolvedPath(to)
  console.log(resovled);
  console.log(to);
  const match = useMatch({ path: resovled.pathname, end: true });
  return <Link to={to} {...rest} style={{ color: match ? "red" : "black" }} />;
  // return(
  //   <NavLink to={to} {...rest} style={({ isActive })=>({color: isActive ?'red':'black'})}/>
  // )
}
function Layout(porps) {
  return (
    <div className="border">
      <CustomLink to="/">首页</CustomLink>
      <CustomLink to="/product">商品</CustomLink>
      <CustomLink to="/user">用户中心</CustomLink>
      <CustomLink to="/login">登录</CustomLink>
      <CustomLink to="/about">about</CustomLink>
      <Outlet></Outlet>
    </div>
  );
}
function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Product() {
  return (
    <div>
      <h1>Product</h1>
      <CustomLink to="/product/123">商品</CustomLink>
      <Outlet></Outlet>
    </div>
  );
}
function ProductDetail() {
  let navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <h1>ProductDetail</h1>
      <p>{params.id}</p>
      <button onClick={() => navigate("/")}>go home</button>
    </div>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
}

function User() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <h1>User</h1>
      <p>{auth.user.username}</p>
      <button
        onClick={() => {
          auth.sigout(() => navigate("/login"));
        }}
      >
        退出登录
      </button>
    </div>
  );
}
function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  if (auth.user) {
    return <Navigate to={from} />;
  }
  const submit = (e) => {
    const formData = new FormData(e.currentTarget);
    const newUser = formData.get("username");
    auth.signin({ username: newUser }, () => {
      navigate(from, { replace: true });
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}
function NoMatch() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
