import AppCTA from "@/components/home/AppCTA";
import CategorySection from "@/components/home/Category";
import FeaturedProducts from "@/components/home/FetureProducts";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonial";
import WhyChooseUs from "@/components/home/WhyChose";
import HowItWorks from "@/components/home/Work";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <StatsSection />
      <AppCTA />
    </div>
  );
};

export default Home;
