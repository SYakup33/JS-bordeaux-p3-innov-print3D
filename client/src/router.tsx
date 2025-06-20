import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.tsx";

import ProductList from "./pages/ProductList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
]);

export default router;
