import ContactSection from "../components/ContactSection";
import FeaturedGardenersSection from "../components/FeaturedGardenersSection";
import SliderBanner from "../components/SliderBanner";
import TopTrendingSection from "../components/TopTrentingSection";
import { UpcomingEventsSection } from "../components/UpcomingEventsSection";

export default function Home() {
  return (
    <>
      <SliderBanner />
      <FeaturedGardenersSection />
      <TopTrendingSection />
      <UpcomingEventsSection />
      <ContactSection />
    </>
  );
}
