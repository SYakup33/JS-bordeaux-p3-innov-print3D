import "./App.css";
import "./../src/assets/styles/_variables.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer position="bottom-left" autoClose={1000} closeOnClick />
    </CartProvider>
  );
}

export default App;
