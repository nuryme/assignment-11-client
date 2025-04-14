import Banner from "../components/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  EffectCards,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";

import testimonials from "../data/testimonial.json";
import stories from "../data/stories.json";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allItems"],
    queryFn: async () => {
      return await axios
        .get(`${import.meta.env.VITE_URL}/items`)
        .then((res) => res.data);
    },
  });

  const items = data?.sort((a, b) => new Date(b.date) - new Date(a.date) || []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return toast.error("Something wrong");
  }
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Banner></Banner>

      {/* cards section */}
      <section className="max_width mt-20">
        <h2 className="text-center">Latest Find & Lost Items</h2>

        <div className="my-8 flex justify-between items-center max-w-8/12 mx-auto">
          <h2 className="max-w-sm">
            Lost and Found – Reuniting People with Their Belongings
          </h2>
          <div className="flex items-center gap-12 text-center">
            <div className="space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16 text-blue-500 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                />
              </svg>

              <h3>1052+</h3>
              <p>Lost Item</p>
            </div>
            <div className="space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16 text-blue-500 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <h3>900+</h3>
              <p>Item Found</p>
            </div>
            <div className="space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16 text-blue-500 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>

              <h3>900+</h3>
              <p>People Happy</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <img
                  src={item.image || "/default-item.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
                    item.postType === "Lost"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {item.postType}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span>
                      {item.postType === "Lost" ? "Lost on: " : "Found on: "}
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>Posted by {item.authorName}</span>
                  </div>
                  <div className="flex items-center">
                    <span>Category: {item.category}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-bold text-red-500 text-lg">
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* View Button */}
                <Link
                  to={`/items/${item._id}`}
                  className="mt-4 inline-block w-full primaryBtn transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Link to={"/allItems"}>
            <button className="primaryBtn">See All</button>
          </Link>
        </div>
      </section>

      {/* feedback section */}
      <section className=" mt-20">
        <div className="bg-[url('https://i.pinimg.com/736x/4c/89/5f/4c895fc71fa898a153b8838d03af0643.jpg')] py-20 relative bg-no-repeat bg-cover bg-center">
          <div className="absolute top-0 bottom-0 right-0 left-0 opacity-60 bg-black"></div>
          <div className="max_width py-10 px-4 isolate object-contain h-full">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              loop={true}
              //   loopAdditionalSlides={2}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                },
              }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide
                  key={testimonial.id}
                  className="w-[300px] h-[500px] flex justify-center items-center mb-4"
                >
                  <div className="w-full h-full bg-transparent text-white p-8 flex flex-col justify-center text-center transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <img
                        className="w-[200px] h-[200px] object-cover  rounded-full"
                        src={testimonial.photo}
                        alt=""
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {testimonial.name}
                    </h3>
                    <p className=" mb-6">{testimonial.location}</p>
                    <p className=" italic max-w-sm text-center mx-auto mb-4">
                      "{testimonial.text}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}

              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
        </div>
      </section>

      {/* success stories section */}
      <section className="max_width mt-20 ">
        <h2 className="text-center">Our Success Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bgPrimary rounded-xl shadow-xl overflow-hidden"
            >
              {/* Image with overlay */}
              <div className="relative h-72">
                <img
                  src={story.afterImage}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold tracking-wider">
                    Returned Safe
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                {/* User info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.location}</p>
                </div>

                {/* Story title */}
                <h4 className="text-xl font-bold mb-2 text-gray-800">
                  {story.title}
                </h4>

                {/* Description */}
                <p className="text-gray-600 mb-4">{story.description}</p>

                {/* Stats */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {story.daysLost} days lost
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {story.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
