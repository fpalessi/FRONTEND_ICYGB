import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sneakers from "./pages/Sneakers";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";

function App() {
  const { userToken } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/sneakers" element={<Sneakers />}></Route>
        <Route path="/products/:category" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route
          path="/login"
          element={userToken ? <Navigate replace to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={userToken ? <Navigate replace to={"/"} /> : <Register />}
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
