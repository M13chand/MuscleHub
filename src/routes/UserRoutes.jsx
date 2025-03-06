import UserList from "../features/user/UserList";
import UserAddForm from "../features/user/UserAddForm";
import UserEditForm from "../features/user/UserEditForm";
import UserDetail from "../features/user/UserDetail";

const UserRoutes = () => [
  {
    path: "add",
    element: <UserAddForm />,
  },
  {
    path: "edit/:id",
    element: <UserEditForm />,
  },
  {
    path: ":id",
    element: <UserDetail />,
  },
  {
    path: "list",
    element: <UserList />,
  },
];

export default UserRoutes;
