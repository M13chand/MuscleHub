import MyCourses from "../pages/user/MyCourses";
import CancelEnrollment from "../pages/user/CancelEnrollment";
import Trainers from "../pages/user/Trainers";
import Profile from "../pages/user/Profile";

const userDashboardRoutes = [
  { path: "mycourses", element: <MyCourses /> },
  { path: "cancelenrollment", element: <CancelEnrollment /> },
  { path: "trainers", element: <Trainers /> },
  { path: "profile", element: <Profile /> },
];

export default userDashboardRoutes;
