import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
