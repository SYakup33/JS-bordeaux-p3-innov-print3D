import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import PaymentFail from "./pages/Payment Issue/PaymentFail.tsx";
import PaymentSuccess from "./pages/Payment Issue/PaymentSuccess.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";
import CartList from "./pages/cart/CartList.tsx";
import Product from "./pages/product/Product.tsx";

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
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "cart/:id",
        element: <CartList />,
      },
      {
        path: "order/:id/confirmation",
        element: <PaymentSuccess />,
      },
      {
        path: "order/:id/paymentfail",
        element: <PaymentFail />,
      },
    ],
  },
]);

export default router;
