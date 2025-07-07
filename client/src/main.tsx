import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { CartProvider } from "./contexts/CartContext";
import { ProductSearchProvider } from "./contexts/ProductSearchContext";
import router from "./router";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <CartProvider>
    <ProductSearchProvider>
      <RouterProvider router={router} />
    </ProductSearchProvider>
  </CartProvider>,
);
