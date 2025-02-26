import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetTrainersQuery,
  useDeleteTrainerMutation,
} from "./trainerApiSlice";

const TrainerList = () => {
  const navigate = useNavigate();
  const { data: trainers, isLoading, error } = useGetTrainersQuery();
  const [deleteTrainer] = useDeleteTrainerMutation();

  if (isLoading) return <p>Loading trainers...</p>;
  // if (error) return <p>Error fetching trainers!</p>;

  const handleEdit = (id) => {
    navigate(`/trainers/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      await deleteTrainer(id);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">Trainer List</h2>
      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-yellow-500">
            <th className="p-2">Name</th>
            <th className="p-2">Expertise</th>
            <th className="p-2">Experience</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers?.map((trainer) => (
            <tr key={trainer.id} className="border-b border-gray-700">
              <td className="p-2">{trainer.name}</td>
              <td className="p-2">{trainer.expertise}</td>
              <td className="p-2">{trainer.experience} years</td>
              <td className="p-2">
                <button
                  className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg mr-2"
                  onClick={() => handleEdit(trainer.id)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleDelete(trainer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerList;
