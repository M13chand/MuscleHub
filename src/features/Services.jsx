import {
  FaRunning,
  FaHeartbeat,
  FaDumbbell,
  FaSwimmer,
  FaWeight,
} from "react-icons/fa";
import { GiLotus } from "react-icons/gi";

const Services = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row py-12 items-center justify-between px-4 md:px-8 lg:px-16 space-y-8 md:space-y-0">
      {/* Service section text portion  */}
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-2xl font-bold text-[#FCF43D] mb-4">Services</h1>
        <h2 className="text-2xl font-semibold mb-2">
          We provide a service that
        </h2>
        <h2 className="text-2xl font-semibold mb-4">fits the best for you.</h2>
        <p className="text-gray-600">
          Achieve greatness in the city's top fitness environment with strength
          training, flexibility workouts, and cardio exercises.
        </p>
      </div>

      {/*  services we provide portion */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center ">
          <FaRunning className="text-yellow-400 text-5xl" />
          <p className="text-lg font-medium">Whole Body Fat Loss</p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <FaSwimmer className="text-yellow-400 text-5xl" />
          <p className="text-lg font-medium">Zumba</p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <GiLotus className="text-yellow-400 text-5xl" />
          <p className="text-lg font-medium">Yoga</p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <FaDumbbell className="text-yellow-400 text-5xl" />
          <p className="text-lg font-medium">Bodybuilding</p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <FaHeartbeat className="text-yellow-400 text-5xl " />
          <p className="text-lg font-medium">Aerobics</p>
        </div>
        <div className="flex flex-col items-center text-center  ">
          <FaWeight className="text-yellow-400 text-5xl " />
          <p className="text-lg font-medium">Free Weight</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
