import React from "react";

const Trainers = () => {
  // You can fetch the list of trainers from the backend or Redux state
  const trainers = [
    { id: 1, name: "John Doe", expertise: "Yoga", image: "/images/john.jpg" },
    {
      id: 2,
      name: "Jane Smith",
      expertise: "Pilates",
      image: "/images/jane.jpg",
    },
  ];

  return (
    <div className="bg-gray-900 p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Trainers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-center">
              {trainer.name}
            </h3>
            <p className="text-center">{trainer.expertise}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
