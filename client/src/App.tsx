import "./App.css";
import "./../src/assets/styles/_variables.css";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { NavigateProvider } from "./contexts/Navigatecontext";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <NavigateProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer position="bottom-left" autoClose={1000} closeOnClick />
      </NavigateProvider>
    </>
  );
}

export default App;
