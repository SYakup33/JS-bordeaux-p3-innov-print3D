import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import router from "./router";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>,
);
