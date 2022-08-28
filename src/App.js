import "./App.css";
import { BrowserRouter as Router, Routes, Route,Link } from "./mini-react-router";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// Link
// } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="product" element={<Product />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

function Layout(porps) {
  return (
    <div className="border">
      <Link to="/">首页</Link>
      <Link to="/product">商品</Link>
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
    </div>
  );
}
