import "./App.css";
import "./../src/assets/styles/_variables.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { NavigateProvider } from "./contexts/Navigatecontext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavigateProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <ToastContainer position="bottom-left" autoClose={1000} closeOnClick />
      </NavigateProvider>
    </>
  );
}

export default App;
