import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product/Product.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <Product />,
  },
]);

export default router;
