import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <header className="bgPrimary">
        <Navbar></Navbar>
      </header>

      <main>
        <Outlet></Outlet>
      </main>

      <footer  className="bgPrimary">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
