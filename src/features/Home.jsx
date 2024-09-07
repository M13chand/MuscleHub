import Contact from "./Contact";
import Display from "./Display";
import Facilities from "./Facilities";
import Reviews from "./Reviews";
import Services from "./Services";
import Trainer from "./Trainer";

const Home = () => {
  return (
    <div>
      <Display />
      <Services />
      <Reviews />
      <Facilities />
      <Trainer />
      <Contact />
    </div>
  );
};
export default Home;
