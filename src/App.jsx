import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

import "./App.css";

function App() {
  const location = useLocation();
  const pathsToHide = ["/login", "/register"];
  const hidingThePaths = pathsToHide.includes(location.pathname);

  return (
    <div>
      {!hidingThePaths && <Header />}
      <Outlet />
      {!hidingThePaths && <Footer />}
    </div>
  );
}

export default App;
