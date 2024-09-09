import React from "react";
import {
  FaRunning,
  FaHeartbeat,
  FaDumbbell,
  FaSwimmer,
  FaWeight,
} from "react-icons/fa";
import { GiLotus } from "react-icons/gi";

const Services = ({ isCompact }) => {
  return (
    <div
      className={`container mx-auto py-12 px-4 md:px-8 lg:px-16 ${
        isCompact
          ? "flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0"
          : "grid  gap-8 sm:text-center sm:place-items-center"
      }`}>
      {/* Service section text portion */}
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-[#FCF43D] mb-4">Services</h1>
        <h2 className="text-2xl font-semibold mb-2">
          We provide a service that
        </h2>
        <h2 className="text-2xl font-semibold mb-4">fits the best for you.</h2>
        <p>
          Achieve greatness in the city's top fitness environment with strength
          training, flexibility workouts, and cardio exercises.
        </p>
      </div>

      {/* Services we provide portion */}
      <div
        className={`grid ${
          isCompact
            ? "grid-cols-2 lg:grid-cols-3 gap-6"
            : " grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text "
        }`}>
        {/* Service cards */}
        {renderServices(isCompact)}
      </div>
    </div>
  );
};

const renderServices = (isCompact) => {
  const services = [
    {
      icon: <FaRunning className="text-yellow-400 text-5xl" />,
      title: "Whole Body Fat Loss",
      description:
        "Intensive workouts targeting every muscle group for comprehensive fat loss and body conditioning.",
      image: "/src/assets/servicecard/fat loss.jpg",
    },
    {
      icon: <FaSwimmer className="text-yellow-400 text-5xl" />,
      title: "Zumba",
      description:
        "Fun and energetic dance workouts combining fitness with great music for full-body toning.",
      image: "/src/assets/servicecard/Zumba.jpeg",
    },
    {
      icon: <GiLotus className="text-yellow-400 text-5xl" />,
      title: "Yoga",
      description:
        "Relax and strengthen your body and mind through guided yoga sessions that cater to all skill levels.",
      image: "/src/assets/servicecard/yoga.jpg",
    },
    {
      icon: <FaDumbbell className="text-yellow-400 text-5xl" />,
      title: "Bodybuilding",
      description:
        "Professional training and guidance for muscle building, strength enhancement, and competition prep.",
      image: "/src/assets/servicecard/bodybuilding.jpeg",
    },
    {
      icon: <FaHeartbeat className="text-yellow-400 text-5xl" />,
      title: "Aerobics",
      description:
        "High-energy aerobic classes to boost cardiovascular health and improve stamina.",
      image: "/src/assets/servicecard/Aerobics.jpg",
    },
    {
      icon: <FaWeight className="text-yellow-400 text-5xl" />,
      title: "Free Weight",
      description:
        "Access to a wide variety of free weights for all your strength training needs.",
      image: "/src/assets/servicecard/Free Weight.jpg",
    },
  ];

  return services.map((service, index) => (
    <div
      key={index}
      className={`flex flex-col items-center text-center   ${
        isCompact
          ? ""
          : "bg-white p-6 rounded-lg shadow-md text-black max-w-md m-auto"
      }`}>
      {service.icon}
      <p className="text-lg font-medium mt-4">{service.title}</p>
      {!isCompact && (
        <>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-40 object-fit mt-4 rounded-lg "
          />
          <p className=" mt-2">{service.description}</p>
        </>
      )}
    </div>
  ));
};

export default Services;
