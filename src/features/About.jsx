const About = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-6 lg:px-16">
      {/* Intro Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-yellow-500">MuscleHub</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Welcome to MuscleHub, where fitness meets community. At MuscleHub, we
          believe in empowering you to reach your full potential with
          personalized training programs, state-of-the-art equipment, and a
          motivating environment.
        </p>
      </section>

      {/* Mission Statement Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Mission</h2>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <p className="text-lg leading-7">
              Our mission is to help you achieve your fitness goals by providing
              a supportive community, expert guidance, and the best resources
              available. We focus on building strength, improving endurance, and
              creating a healthier lifestyle for all our members.
            </p>
          </div>
          <img
            src="/src/assets/About.jpg"
            alt="Gym Mission"
            className="lg:w-1/2 rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Us Today</h2>
        <p className="mb-6 max-w-lg mx-auto">
          Ready to take the first step towards a healthier you? Contact us today
          or visit our gym to experience the MuscleHub difference!
        </p>
        <button className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300">
          Become a Member
        </button>
      </section>
    </div>
  );
};

export default About;
