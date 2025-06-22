import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import CartList from "./pages/CartList";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/cart/user/:id",
        element: <CartList />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(<RouterProvider router={router} />);
