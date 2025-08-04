import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion } from 'framer-motion'

const videos = [
    {
        title: "Revolutionaries – Official Trailer",
        videoId: "QwGwe6_ZVMQ",
        rating: "Coming Soon",
        description:
            "A gripping period drama showcasing India's unsung freedom fighters. Produced by BBKV & Amazon Prime, releasing in 2026.",
    },
    {
        title: "Dhindora",
        videoId: "IUsiTOUo3HE",
        rating: "8.8",
        description:
            "Bhuvan Bam plays 10 quirky characters in this hilarious story of a middle-class lottery twist. A viral BBKV original with over 500M+ views.",
    },
    {
        title: "Plus Minus",
        videoId: "jKyXUJceZ6k",
        rating: "8.5",
        description:
            "A thoughtful short film about two strangers sharing life lessons on a train. Starring Bhuvan Bam and Divya Dutta, Filmfare winner.",
    },
    {
        title: "Taaza Khabar",
        videoId: "zm6xa3ggt5A",
        rating: "8.1",
        description:
            "A sanitation worker's life changes after gaining future-reading powers. Bhuvan Bam shines in this fantasy-thriller series on Hotstar.",
    },
    {
        title: "Rafta-Rafta",
        videoId: "jflj9Watzl4",
        rating: "7.2",
        description:
            "A light-hearted romantic comedy series on Amazon miniTV about newlyweds Karan (Bhuvan Bam) and Nithya (Srishti Ganguli Rindani) navigating everyday marriage moments comically and emotionally",
    },
];

export default function shows() {
    const playerRef = useRef(null);
    const sectionRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(videos[0]);
    const [isVisible, setIsVisible] = useState(false);

    // Load YouTube IFrame API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        } else {
            loadPlayer();
        }

        window.onYouTubeIframeAPIReady = loadPlayer;
    }, []);

    // Load player with current video ID
    const loadPlayer = () => {
        playerRef.current = new window.YT.Player("ytplayer", {
            videoId: activeVideo.videoId,
            playerVars: {
                autoplay: 0, // Don't autoplay initially
                controls: 0,
                modestbranding: 1,
                loop: 1,
                rel: 0,
                showinfo: 0,
                mute: 0,
                playlist: activeVideo.videoId,
            },
            events: {
                onReady: (event) => {
                    // Only play if section is visible
                    if (isVisible) {
                        event.target.unMute();
                        event.target.playVideo();
                    }
                },
            },
        });
    };

    // Re-load video on list click
    const handleVideoChange = (video) => {
        setActiveVideo(video);
        if (playerRef.current) {
            playerRef.current.loadVideoById(video.videoId);
            // Only play if section is visible
            if (isVisible) {
                playerRef.current.unMute();
                playerRef.current.playVideo();
            }
        }
    };

    // Play/pause on intersection with better visibility detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;
                setIsVisible(isIntersecting);
                
                if (playerRef.current) {
                    if (isIntersecting) {
                        // Small delay to ensure smooth transition
                        setTimeout(() => {
                            if (playerRef.current) {
                                playerRef.current.unMute();
                                playerRef.current.playVideo();
                            }
                        }, 300);
                    } else {
                        playerRef.current.pauseVideo();
                    }
                }
            },
            { 
                threshold: 0.5, // Higher threshold for better visibility detection
                rootMargin: "-10% 0px -10% 0px" // Only consider it visible when more of it is on screen
            }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="shows"
            ref={sectionRef}
            className="w-full bg-black text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16"
        >
            {/* Heading */}
            <div className="w-full bg-black py-8 sm:py-12 text-center">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    BBKV <span className="text-yellow-400 cursor-target">SHOWS</span>
                </motion.h2>
            </div>

            {/* Layout */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
                {/* Video Section */}
                <div className="relative w-full lg:w-3/5 aspect-video rounded-xl overflow-hidden shadow-2xl mb-6 sm:mb-0">
                    {/* YouTube API player */}
                    <div className="absolute inset-0 z-0">
                        <div id="ytplayer" className="w-full h-full" />
                    </div>

                    {/* Overlay Description - Hidden on mobile, visible on desktop */}
                    <div className="hidden sm:block absolute -bottom-2 left-0 w-full bg-black/80 z-20 p-3 sm:p-4 backdrop-blur-sm mx-4 sm:mx-0 mb-4 sm:mb-0">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                            🎬 {activeVideo.title}
                        </h3>
                        <p className="text-yellow-300 text-xs sm:text-sm">IMDb Rating: ⭐ {activeVideo.rating}/10</p>
                        <p className="text-xs sm:text-sm text-white mt-1">{activeVideo.description}</p>
                    </div>
                </div>

                {/* Sidebar - Other Videos */}
                <div className="w-full lg:w-2/5 flex flex-col gap-3 sm:gap-4">
                    <h4 className="px-2 sm:px-4 text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 text-white">
                        Upcoming & Latest Shows!
                    </h4>
                    {videos.map((video, i) => (
                        <button
                            key={i}
                            onClick={() => handleVideoChange(video)}
                            className={`cursor-target bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-3 rounded flex justify-between items-center transition-all ${video.videoId === activeVideo.videoId ? "border border-yellow-400" : ""
                                }`}
                        >
                            <div className="flex flex-col text-left flex-1 min-w-0">
                                <span className="text-white text-xs sm:text-sm md:text-base truncate">{video.title}</span>
                                <span className="text-xs sm:text-sm text-yellow-300">⭐ {video.rating} IMDb</span>
                            </div>
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0 ml-2" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
