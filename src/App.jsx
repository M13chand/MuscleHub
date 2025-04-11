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
import UserDashboard from "./pages/user/UserDashboard";
import UserRoutes from "./routes/userDashboardRoutes";
import adminDashboardRoutes from "./routes/adminDashboardRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard ";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        // Public routes
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "reviews", element: <Reviews /> },
        { path: "servicepage", element: <ServicePage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "login", element: <LoginPage /> },

        // Protected User Dashboard Routes
        {
          path: "user/dashboard",
          element: (
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          ),
          children: UserRoutes(),
        },

        // Protected Admin Dashboard Routes
        {
          path: "admin/dashboard",
          element: (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          ),
          children: adminDashboardRoutes, // Using the imported array directly
        },

        // Catch all route for 404
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
