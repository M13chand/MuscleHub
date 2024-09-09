import Display from "./Display";
import Facilities from "./Facilities";
import Reviews from "./Reviews";

import ContactSection from "./shared/ContactSection";
import Services from "./shared/Services";

import Trainer from "./Trainer";

const Home = () => {
  return (
    <div>
      <Display />
      <Services isCompact={true} />
      <Reviews />
      <Facilities />
      <Trainer />
      <ContactSection />
    </div>
  );
};
export default Home;
