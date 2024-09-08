import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const ReviewComponent = () => {
  return (
    <div className="container mx-auto py-10 px-5">
      <h2 className="text-2xl text-center">Stories of our</h2>
      <h2 className="text-3xl text-center">
        <span className="text-yellow-500">MuscleHub </span>
        Family
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Images Section */}
        <div className="relative flex justify-center items-center">
          <div className="relative">
            <img
              src="/src/assets/Display page.PNG"
              alt="Before Transformation"
              className="w-32 h-40 object-cover rounded-lg transform translate-x-4 top-9 left-96"
            />
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm bg-black/70 px-2 rounded-full">
              Before
            </p>
          </div>
          <div className="absolute">
            <img
              src="/src/assets/Display page.PNG"
              alt="After Transformation"
              className="w-32 h-40 object-cover rounded-lg z-10"
            />
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm bg-black/70 px-2 rounded-full">
              After
            </p>
          </div>
        </div>
        {/* Review Section */}
        <div className="flex flex-col text-center max-w-md">
          <div className="relative">
            <FaChevronLeft
              aria-label="Previous Review"
              className="absolute right-9 text-white cursor-pointer"
            />
            <FaChevronRight
              aria-label="Next Review"
              className="absolute right-0 text-white cursor-pointer"
            />
          </div>
          <p className="mt-4 mb-2 italic">
            “A complete package to all the fitness freaks out there. Join soon
            and test yourself. Vyayamshala’s layouts, environment and its
            surroundings play a vital role to motivate and go beyond your
            limitations.”
          </p>
          {/* Rating */}
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          <p className="text-sm font-light">John Doe, Student</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
