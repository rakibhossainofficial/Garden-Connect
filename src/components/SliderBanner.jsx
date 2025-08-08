import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const eventSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    title: "Balcony Gardening Workshop",
    description:
      "Join our hands-on event to learn how to create a lush balcony garden. Free seeds for all participants!",
    button: { text: "Join Event", link: "/events/balcony-gardening" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    title: "Composting 101",
    description:
      "Discover the secrets of composting and turn your kitchen waste into garden gold. Open Q&A included.",
    button: { text: "Learn More", link: "/events/composting-101" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    title: "Hydroponics for Beginners",
    description:
      "Explore soilless gardening! Perfect for small spaces and urban gardeners. Materials provided.",
    button: { text: "Sign Up", link: "/events/hydroponics" },
  },
];

export default function SliderBanner() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg"
      >
        {eventSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative h-[350px] md:h-[450px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div className="relative z-10 text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow">
                  {slide.title}
                </h2>
                <p className="mb-4 text-lg md:text-xl drop-shadow">
                  {slide.description}
                </p>
                {/* <a href={slide.button.link} className="btn btn-primary">
                  {slide.button.text}
                </a> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
