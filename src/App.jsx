import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Contact from "./features/Contact";
import About from "./features/About";
import Home from "./features/Home";
import Reviews from "./features/Reviews";
import Services from "./features/Services";
import PageNotFound from "./features/PageNotFound";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/reviews",
          element: <Reviews />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
