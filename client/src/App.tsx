import "./App.css";
import "./../src/assets/styles/_variables.css";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
