import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "./App";
import Cart from "./pages/Cart";
import ConfirmatedOrder from "./pages/ConfirmatedOrder";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/order/confirmation", element: <ConfirmatedOrder /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(<RouterProvider router={router} />);
