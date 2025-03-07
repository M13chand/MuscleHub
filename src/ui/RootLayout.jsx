import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const RootLayout = () => {
  return (
    <div>
      <Header />

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
