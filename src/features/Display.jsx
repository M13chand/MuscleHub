import { PiPlayCircleFill } from "react-icons/pi";

const Display = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
      <div className="mt-10 md:mt-[57px]">
        <h1 className="text-3xl md:text-4xl">Join The World</h1>
        <h1 className="text-3xl md:text-4xl">Of Fitness.</h1>
        <p className="text-sm py-5">
          Our aim is to bring more people into fitness so that every individual,
          family, society, and the whole nation benefits.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <button className="bg-[#FCF43D] hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-2xl">
            Join Now
          </button>
          <button className="flex items-center">
            <PiPlayCircleFill className="text-black" size={24} />
            <span className="ml-2">Watch Video</span>
          </button>
        </div>
        {/* Information about the experience */}
        <div className="flex justify-center md:justify-start text-center gap-5 md:gap-10 px-3 mt-10 md:mt-14">
          <div>
            <h1 className="text-yellow-500 font-bold text-xl md:text-2xl">7</h1>
            <p className="text-sm md:text-base">Years</p>
            <p className="text-sm md:text-base">Experience</p>
          </div>

          <div>
            <h1 className="text-yellow-500 font-bold text-xl md:text-2xl">
              25k+
            </h1>
            <p className="text-sm md:text-base">Happy</p>
            <p className="text-sm md:text-base">Customers</p>
          </div>

          <div>
            <h1 className="text-yellow-500 font-bold text-xl md:text-2xl">
              95
            </h1>
            <p className="text-sm md:text-base">Gym</p>
            <p className="text-sm md:text-base">Trainers</p>
          </div>
        </div>
      </div>

      {/* Display Image */}
      <div className="mt-5 md:mt-[7px] flex justify-center md:justify-end">
        <img
          className="h-auto max-h-[500px] w-full object-cover md:h-[500px]"
          src="/src/assets/Display page.PNG"
          alt="display-image"
        />
      </div>
    </div>
  );
};

export default Display;
