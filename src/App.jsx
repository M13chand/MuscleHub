import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Home from "./features/Home";

import LoginPage from "./features/auth/Login";
import RegisterPage from "./features/auth/Register";

import Contact from "./features/Contact";
import About from "./features/About";
import Reviews from "./features/Reviews";
import PageNotFound from "./features/PageNotFound";
import ServicePage from "./features/ServicePage";

import CourseRoutes from "./routes/courseRoutes";
import TrainerRoutes from "./routes/trainerRoutes";
import EnrollmentRoutes from "./routes/enrollmentRoutes";
import ReviewRoutes from "./routes/reviewRoutes";

import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard ";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "reviews", element: <Reviews /> },
        { path: "servicepage", element: <ServicePage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "login", element: <LoginPage /> },

        { path: "dashboard", element: <UserDashboard /> },
        { path: "admin/dashboard", element: <AdminDashboard /> },

        {
          path: "courses",
          children: [...CourseRoutes()],
        },
        {
          path: "trainers",
          children: [...TrainerRoutes()],
        },
        {
          path: "enrollments",
          children: [...EnrollmentRoutes()],
        },
        {
          path: "reviews",
          children: [...ReviewRoutes()],
        },

        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
