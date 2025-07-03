import "./App.css";
import "./../src/assets/styles/_variables.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        newestOnTop
        closeOnClick
      />
    </>
  );
}

export default App;
