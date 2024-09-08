const trainers = [
  {
    name: "Alex Thompson",
    image: "/src/assets/trainers/trainer 2.jpg",
  },
  {
    name: "Emily White",
    image: "/src/assets/trainers/trainer 1.jpg",
  },
  {
    name: "David Johnson",
    image: "/src/assets/trainers/trainer 3.jpg",
  },
  {
    name: "David Johnson",
    image: "/src/assets/trainers/Trainer 4.avif",
  },
  {
    name: "David Johnson",
    image: "/src/assets/trainers/Trainer 4.avif",
  },
  {
    name: "David Johnson",
    image: "/src/assets/trainers/Trainer 4.avif",
  },
];

const Trainer = () => {
  return (
    <div className="container mx-auto py-12 ">
      <h1 className="text-4xl text-center mb-10">
        Meet our <span className="text-yellow-500">Trainers</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {trainers.map((trainer, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-48 h-48 object-cover rounded-full mb-4"
            />
            <h3 className="text-sm">{trainer.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainer;
