import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import PaymentFail from "./pages/Payment Issue/PaymentFail.tsx";
import PaymentSuccess from "./pages/Payment Issue/PaymentSuccess.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";
import Logout from "./pages/auth/Logout.tsx";
import Login from "./pages/auth/login/Login.tsx";
import Register from "./pages/auth/register/Register.tsx";
import CartList from "./pages/cart/CartList.tsx";
import ContactForm from "./pages/contact/ContactForm.tsx";
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
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "cart/:id",
        element: <CartList />,
      },
      {
        path: "order/:id/paymentsuccess",
        element: <PaymentSuccess />,
      },
      {
        path: "order/:id/paymentfail",
        element: <PaymentFail />,
      },
      {
        path: "contact",
        element: <ContactForm />,
      },
    ],
  },
]);

export default router;
