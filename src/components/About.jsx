// src/components/About.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bbkvTeam from '../assets/bbkv-team.png'
import rohitImg from '../assets/rohit-raj.png'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function AboutUs() {
  const headingRef = useRef(null)
  const bhuvanTextRef = useRef(null)
  const bhuvanImageRef = useRef(null)
  const rohitImageRef = useRef(null)
  const rohitTextRef = useRef(null)

  useEffect(() => {
    // Heading animation
    gsap.fromTo(headingRef.current,
      { 
        scale: 0.9, 
        opacity: 0,
        y: 50
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Bhuvan section animations
    gsap.fromTo(bhuvanTextRef.current,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bhuvanTextRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    gsap.fromTo(bhuvanImageRef.current,
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bhuvanImageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Rohit section animations
    gsap.fromTo(rohitImageRef.current,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rohitImageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    gsap.fromTo(rohitTextRef.current,
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rohitTextRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id='about' className="w-full bg-black">
      {/* TOP HEADING – THE BACKSTORY */}
      <div className="w-full bg-black py-8 sm:py-12 text-center px-4">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          THE <span className="text-yellow-400 cursor-target">BACKSTORY</span>
        </h2>
      </div>

      {/* SECTION 1 – BHUVAN "BAM" */}
      <div className="w-full bg-dark py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20" id="bhuvan">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <div
            ref={bhuvanTextRef}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
              BHUVAN <span className="text-yellow-400">"BAM"</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-4 sm:mb-6">
              BBKV Productions was born from the mind of Bhuvan Bam — one of India's most beloved digital storytellers. With roots in YouTube comedy, Bhuvan expanded his creative universe into producing short films, web shows, and more.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-4 sm:mb-6">
              His breakthrough with "Plus Minus" and "Dhindora" brought indie storytelling into the mainstream, all while maintaining an authentic, heartfelt connection with millions of viewers.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
              BBKV is a reflection of Bhuvan's vision — where raw emotion, humor, and truth converge into powerful cinematic moments.
            </p>
          </div>

          {/* Image Content */}
          <div
            ref={bhuvanImageRef}
            className="order-1 lg:order-2"
          >
            <img
              src={bbkvTeam}
              alt="BBKV Team"
              className="cursor-target w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 – ROHIT "RAJ" */}
      <div className="w-full bg-black py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20" id="rohit">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image on the left */}
          <div
            ref={rohitImageRef}
            className="order-1"
          >
            <img
              src={rohitImg}
              alt="Rohit Raj"
              className="cursor-target w-full h-auto rounded-xl shadow-xl"
            />
          </div>

          {/* Text on the right */}
          <div
            ref={rohitTextRef}
            className="order-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
              ROHIT <span className="text-yellow-400">"RAJ"</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
              Behind every successful creator is a visionary — and for BBKV, that's Rohit Raj. The co-founder, executor, and manager who took Bhuvan's ideas and built an empire around them.
              <br /><br />
              From logistics to creative direction, Rohit plays a crucial role in maintaining the authenticity of BBKV while scaling it as a serious player in India's entertainment scene.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
