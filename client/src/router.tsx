import { createBrowserRouter } from "react-router";
import ConfirmedOrder from "./pages/ConfirmedOrder.tsx";
import Home from "./pages/Home.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";
import Product from "./pages/Product/Product.tsx";
import CartList from "./pages/cart/CartList.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart/user/:id",
        element: <CartList />,
      },
      {
        path: "/order/:id/confirmation",
        element: <ConfirmedOrder />,
      },
    ],
  },
]);

export default router;
 