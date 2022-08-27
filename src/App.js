import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />}>
              <Route path=":id" element={<ProductDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch></NoMatch>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <Link to="/">首页</Link>
      <Link to="/product">商品</Link>
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
      <Link to="/product/123">详情</Link>
      <Outlet></Outlet>
    </div>
  );
}

function ProductDetail() {
  const params = useParams();
  let navigate = useNavigate();
  return (
    <div>
      <h1>ProductDetail:{params.id}</h1>
      <button onClick={() => navigate("/")}>go home</button>
    </div>
  );
}
function NoMatch(params) {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
