import { PiPlayCircleFill } from "react-icons/pi";

const Display = () => {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-10  ">
      <div className="mt-[57px]">
        <h1 className="text-4xl">Join The World </h1>
        <h1 className="text-4xl">Of Fitness. </h1>
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
        <div className="flex text-center gap-10 px-3 mt-14 ">
          <div>
            <h1 className="text-yellow-500 font-bold ">7</h1>
            <p>Years</p>
            <p>Experience</p>
          </div>

          <div>
            <h1 className="text-yellow-500 font-bold">25k+</h1>
            <p>Happy</p>
            <p>Customers</p>
          </div>

          <div>
            <h1 className="text-yellow-500 font-bold">95</h1>
            <p>Gym</p>
            <p>Trainers</p>
          </div>
        </div>
      </div>

      {/* display Image  */}
      <div className="mt-[7px]">
        <img
          className="h-[500px] "
          src="/src/assets/Display page.PNG"
          alt="display-image"
        />
      </div>
    </div>
  );
};

export default Display;
