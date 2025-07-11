import "./App.css";
import "./../src/assets/styles/_variables.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
