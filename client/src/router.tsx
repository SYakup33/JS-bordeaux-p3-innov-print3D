import { createBrowserRouter } from "react-router";

import Products from "./pages/ProductList.tsx";

const router = createBrowserRouter([
  {
    path: "/products",
    element: <Products />,
  },
]);

export default router;
