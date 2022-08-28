import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "./mini-react-router";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product" element={<Product />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

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
