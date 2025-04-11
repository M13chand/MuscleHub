import React from "react";
import { useParams } from "react-router-dom";
import { useGetTrainerByIdQuery } from "./trainerApiSlice";

const TrainerDetail = () => {
  const { id } = useParams();
  const { data: trainer, error, isLoading } = useGetTrainerByIdQuery(id);

  if (isLoading) return <p>Loading trainer details...</p>;
  if (error) return <p>Error loading trainer details</p>;

  return (
    <div className="trainer-detail p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-yellow-500">{trainer?.name}</h1>
      <p className="text-yellow-500">Expertise: {trainer?.expertise}</p>
      <p className="text-gray-300">Experience: {trainer?.experience} years</p>
      <p className="text-gray-300">Email: {trainer?.email}</p>
      <p className="text-gray-300">Phone: {trainer?.phone}</p>
      <p className="text-gray-300">Bio: {trainer?.bio}</p>
      <p className="text-gray-300">
        <strong>Courses:</strong>
        {trainer?.courses && trainer.courses.length > 0 ? (
          trainer.courses.map((course, index) => (
            <span key={course.id}>
              {course.name}
              {index < trainer.courses.length - 1 && ", "}
            </span>
          ))
        ) : (
          <span>No courses assigned</span>
        )}
      </p>
    </div>
  );
};

export default TrainerDetail;
