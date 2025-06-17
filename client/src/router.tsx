import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.tsx";

import Products from "./pages/ProductList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

export default router;
