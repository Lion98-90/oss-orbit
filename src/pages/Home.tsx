import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemDemo from "@/components/ProblemDemo";
import FeaturedCollections from "@/components/FeaturedCollections";
import WhyHealthScore from "@/components/WhyHealthScore";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemDemo />
        <FeaturedCollections />
        <WhyHealthScore />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
