import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.tsx";
import PaymentFail from "./pages/Payment Issue/PaymentFail.tsx";
import PaymentSuccess from "./pages/Payment Issue/PaymentSuccess.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";
import About from "./pages/about/About.tsx";
import Admin from "./pages/admin/products/ProductsManagement.tsx";
import Logout from "./pages/auth/Logout.tsx";
import Login from "./pages/auth/login/Login.tsx";
import Register from "./pages/auth/register/Register.tsx";
import CartList from "./pages/cart/CartList.tsx";
import ContactForm from "./pages/contact/ContactForm.tsx";
import Home from "./pages/home/Home.tsx";
import AdminOrders from "./pages/order/adminOrders/AdminOrders.tsx";
import UserOrders from "./pages/order/userOrders/userOrders.tsx";
import Product from "./pages/product/Product.tsx";
import UserProfil from "./pages/userProfile/UserProfil.tsx";

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
        path: "admin/orders",
        element: (
          <ProtectedAdminRoute>
            <AdminOrders />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "admin/products",
        element: (
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: ":userId/me",
        element: <UserProfil />,
      },
      {
        path: "contact",
        element: <ContactForm />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "myaccount/orders/:id",
        element: <UserOrders />,
      },
    ],
  },
]);

export default router;
