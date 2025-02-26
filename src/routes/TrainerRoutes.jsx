import TrainerList from "../features/trainers/TrainerList";
import TrainerAddForm from "../features/trainers/TrainerAddForm";
import TrainerEditForm from "../features/trainers/TrainerEditForm";
import TrainerDetail from "../features/trainers/TrainerDetails";

const TrainerRoutes = () => [
  {
    path: "add",
    element: <TrainerAddForm />,
  },
  {
    path: "edit/:id",
    element: <TrainerEditForm />,
  },
  {
    path: ":id",
    element: <TrainerDetail />,
  },
  {
    path: "list",
    element: <TrainerList />,
  },
];

export default TrainerRoutes;
