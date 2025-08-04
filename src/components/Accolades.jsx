import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaAward, FaTrophy, FaStar, FaCrown, FaMedal, FaGem } from 'react-icons/fa';
import 'swiper/css';

const accolades = [
  {
    year: '2015',
    title: 'Silver Creator Award',
    description: 'Awarded by YouTube for surpassing 100K subscribers.',
    icon: FaAward,
  },
  {
    year: '2016',
    title: 'Gold Creator Award',
    description: 'Crossed 1 million subscribers on YouTube.',
    icon: FaTrophy,
  },
  {
    year: '2016',
    title: 'WebTVAsia Award',
    description: 'Won Most Popular Channel at WebTVAsia Awards.',
    icon: FaStar,
  },
  {
    year: '2018',
    title: 'Diamond Creator Award',
    description: 'Achieved 10 million subscribers milestone on YouTube.',
    icon: FaGem,
  },
  {
    year: '2019',
    title: 'Filmfare Award – Plus Minus',
    description: 'Won Best Short Film alongside Divya Dutta.',
    icon: FaCrown,
  },
  {
    year: '2019',
    title: 'World Blogger Award',
    description: 'Honored as Global Entertainer Of The Year.',
    icon: FaMedal,
  },
  {
    year: '2020',
    title: 'Forbes 30 Under 30 Asia',
    description: 'Recognized in the Entertainment category.',
    icon: FaAward,
  },
  {
    year: '2022',
    title: 'IWM Digital Awards',
    description: 'Breakthrough Performance (Male) for "Dhindora".',
    icon: FaTrophy,
  },
  {
    year: '2023',
    title: 'IWM Digital Awards',
    description: 'Most Popular Actor for "Taaza Khabar".',
    icon: FaStar,
  },
  {
    year: '2023',
    title: 'Bollywood Hungama Style Icon',
    description: 'Most Stylish Digital Entertainer (Male).',
    icon: FaCrown,
  },
  {
    year: '2023',
    title: 'Creators United',
    description: 'Won Star Creator Of The Year.',
    icon: FaMedal,
  },
];

// Create duplicate items for proper looping (more duplicates for smoother loop)
const mobileAccolades = [...accolades, ...accolades.slice(0, 6)];

export default function AwardsTimeline() {
  const swiperRef = useRef();

  return (
    <section id='accolades' className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          BBKV <span className="text-yellow-400 cursor-target">ACCOLADES</span>
        </motion.h2>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block relative max-w-4xl mx-auto">
        {/* Vertical Line with Checkpoints */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400 z-10" />
        
        {/* Checkpoint dots aligned with card centers */}
        {accolades.map((_, index) => {
          // Calculate position based on card center
          const cardHeight = 120; // Approximate card height
          const spacing = 80; // Approximate spacing between cards
          const totalCardHeight = cardHeight + spacing;
          const cardCenter = (index * totalCardHeight) + (cardHeight / 2);
          const timelineHeight = (accolades.length - 1) * totalCardHeight;
          const percentage = (cardCenter / timelineHeight) * 100;
          
          return (
            <div
              key={index}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black z-20"
              style={{
                top: `${percentage}%`,
                marginTop: '-8px'
              }}
            />
          );
        })}

        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {accolades.map((item, index) => {
            const isRight = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${isRight ? 'md:justify-start' : 'md:justify-end'} w-full`}
              >
                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`cursor-target bg-zinc-900 rounded-xl shadow-xl p-4 sm:p-6 w-full md:w-[calc(50%-4rem)] z-20 ${isRight ? 'md:order-1' : 'md:order-2'} relative`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.year}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {mobileAccolades.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                {/* Content Box - No Icon in Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="cursor-target bg-zinc-900 rounded-xl shadow-xl p-6 w-full relative"
                >
                  <h3 className="text-lg font-semibold text-yellow-400">{item.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.year}</p>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
