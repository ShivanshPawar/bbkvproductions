import { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const videos = [
    {
        id: 1,
        title: 'Song : Paisa',
        url: 'https://www.youtube.com/embed/Tb3x5I0ulCg',
    },
    {
        id: 2,
        title: 'Song : Dhindora',
        url: 'https://www.youtube.com/embed/l8zlKap1JEo',
    },
    {
        id: 3,
        title: 'Song : Safar',
        url: 'https://www.youtube.com/embed/Zqv5CBWt9yA',
    },
    {
        id: 4,
        title: 'Song : So Matt Jaag Zara',
        url: 'https://www.youtube.com/embed/n-jjX5W1ZGw',
    },
    {
        id: 5,
        title: 'Song : Loot Machi Hai',
        url: 'https://www.youtube.com/embed/RRGCxob-_Dc',
    },
    {
        id: 6,
        title: 'Song : Haseen Raat',
        url: 'https://www.youtube.com/embed/bJi4Gch38G4',
    },
    {
        id: 7,
        title: 'Song : Bring You Down',
        url: 'https://www.youtube.com/embed/ugmUtsyMxOk',
    },
    {
        id: 8,
        title: 'Song : Khwaabon Ke Mele',
        url: 'https://www.youtube.com/embed/CJJUnX-Yn60',
    },
    {
        id: 9,
        title: 'Song : Sab Dhuan',
        url: 'https://www.youtube.com/embed/rHcwiVjb0-s',
    },
    {
        id: 10,
        title: 'Song : Taaza Khabar Soundtrack',
        url: 'https://www.youtube.com/embed/bjgc5lgtgew',
    },
    {
        id: 11,
        title: 'Song : Taaza Khabar Season 2 | Soundtrack',
        url: 'https://www.youtube.com/embed/EfjwHVvHKiM',
    },
];

export default function BBKVCinema() {
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const sectionRef = useRef();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mobilePlaylistStart, setMobilePlaylistStart] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const currentVideo = videos[currentVideoIndex];

    const playVideo = () => {
        const iframe = videoRef.current;
        if (iframe) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo' }),
                '*'
            );
            setIsPlaying(true);
        }
    };

    const pauseVideo = () => {
        const iframe = videoRef.current;
        if (iframe) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo' }),
                '*'
            );
            setIsPlaying(false);
        }
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseVideo();
        } else {
            playVideo();
        }
    };

    const toggleMute = () => {
        const iframe = videoRef.current;
        if (iframe) {
            if (isMuted) {
                iframe.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'unMute' }),
                    '*'
                );
                setIsMuted(false);
            } else {
                iframe.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'mute' }),
                    '*'
                );
                setIsMuted(true);
            }
        }
    };

    const previousVideo = () => {
        const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : videos.length - 1;
        setCurrentVideoIndex(newIndex);
        setIsPlaying(false);
        
        // Update mobile playlist position
        if (newIndex < mobilePlaylistStart) {
            setMobilePlaylistStart(Math.max(0, newIndex - 1));
        }
    };

    const nextVideo = () => {
        const newIndex = currentVideoIndex < videos.length - 1 ? currentVideoIndex + 1 : 0;
        setCurrentVideoIndex(newIndex);
        setIsPlaying(false);
        
        // Update mobile playlist position
        if (newIndex >= mobilePlaylistStart + 5) {
            setMobilePlaylistStart(Math.min(videos.length - 3, newIndex - 1));
        }
    };

    const toggleFullscreen = () => {
        // Check if it's mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // For mobile, open YouTube video in new tab
            const videoId = currentVideo.url.split('/').pop();
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            window.open(youtubeUrl, '_blank');
        } else {
            // For desktop, use native fullscreen
            if (!document.fullscreenElement) {
                if (videoContainerRef.current.requestFullscreen) {
                    videoContainerRef.current.requestFullscreen();
                } else if (videoContainerRef.current.webkitRequestFullscreen) {
                    videoContainerRef.current.webkitRequestFullscreen();
                } else if (videoContainerRef.current.msRequestFullscreen) {
                    videoContainerRef.current.msRequestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                setIsFullscreen(false);
            }
        }
    };

    // Handle video selection
    const selectVideo = (index) => {
        setCurrentVideoIndex(index);
        setIsPlaying(false);
        
        // Update mobile playlist position to keep selected video in view
        if (index < mobilePlaylistStart) {
            setMobilePlaylistStart(Math.max(0, index - 1));
        } else if (index >= mobilePlaylistStart + 5) {
            setMobilePlaylistStart(Math.min(videos.length - 3, index - 1));
        }
    };

    // Get mobile playlist (3 songs: previous, current, next)
    const getMobilePlaylist = () => {
        const playlist = [];
        for (let i = mobilePlaylistStart; i < Math.min(mobilePlaylistStart + 3, videos.length); i++) {
            playlist.push({
                ...videos[i],
                index: i
            });
        }
        return playlist;
    };

    // Intersection observer for auto play/pause with better visibility detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;
                setIsVisible(isIntersecting);
                
                if (!isIntersecting) {
                    pauseVideo();
                } else {
                    // Auto-play when entering section with delay
                    setTimeout(() => {
                        if (videoRef.current) {
                            playVideo();
                        }
                    }, 500);
                }
            },
            { 
                threshold: 0.5, // Higher threshold for better visibility detection
                rootMargin: "-10% 0px -10% 0px" // Only consider it visible when more of it is on screen
            }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // Auto-play when video changes (only if section is visible)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current && isVisible) {
                playVideo();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentVideoIndex, isVisible]);

    return (
        <section
            id='tracklist'
            ref={sectionRef}
            className="w-full bg-black text-white py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden"
        >
            {/* Animated Heading */}
            <div className="w-full bg-black py-2 sm:py-4 text-center">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    BBKV <span className="text-yellow-400 cursor-target">TRACKS</span>
                </motion.h2>
            </div>

            {/* Video Container */}
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Pagination Buttons - Desktop Only */}
                    <div className="hidden lg:flex absolute left-4 right-4 top-1/2 transform -translate-y-1/2 z-10 justify-between">
                        <button
                            onClick={previousVideo}
                            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                            title="Previous Track"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextVideo}
                            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                            title="Next Track"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    <div 
                        ref={videoContainerRef}
                        className="relative rounded-xl overflow-hidden shadow-2xl mb-6"
                    >
                        <iframe
                            ref={videoRef}
                            className="w-full aspect-video"
                            src={`${currentVideo.url}?enablejsapi=1&autoplay=0&mute=0&controls=0&loop=0&playlist=${currentVideo.url.split('/').pop()}`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={currentVideo.title}
                        />
                    </div>
                </div>

                {/* Video Title - Desktop Only Current Song */}
                <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {currentVideo.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        {currentVideoIndex + 1} of {videos.length}
                    </p>
                </div>

                {/* Player Controls - Mobile Only */}
                <div className="lg:hidden flex justify-center items-center gap-4 mb-6">
                    <button
                        onClick={previousVideo}
                        className="text-white hover:text-yellow-400 transition-colors p-2"
                        title="Previous Track"
                    >
                        <SkipBack size={24} />
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="text-white hover:text-yellow-400 transition-colors p-3 bg-yellow-400/10 rounded-full"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                    <button
                        onClick={nextVideo}
                        className="text-white hover:text-yellow-400 transition-colors p-2"
                        title="Next Track"
                    >
                        <SkipForward size={24} />
                    </button>
                    <button
                        onClick={toggleMute}
                        className="text-white hover:text-yellow-400 transition-colors p-2"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-yellow-400 transition-colors p-2"
                        title="Open in YouTube"
                    >
                        <Maximize2 size={24} />
                    </button>
                </div>

                {/* Mobile Playlist - 3 Songs Only */}
                <div className="lg:hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold">Playlist</h4>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMobilePlaylistStart(Math.max(0, mobilePlaylistStart - 1))}
                                disabled={mobilePlaylistStart === 0}
                                className="text-white hover:text-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setMobilePlaylistStart(Math.min(videos.length - 3, mobilePlaylistStart + 1))}
                                disabled={mobilePlaylistStart >= videos.length - 3}
                                className="text-white hover:text-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        {getMobilePlaylist().map((video) => (
                            <button
                                key={video.id}
                                onClick={() => selectVideo(video.index)}
                                className={`w-full p-3 rounded-lg text-left transition-all ${
                                    video.index === currentVideoIndex
                                        ? 'bg-yellow-400/20 border border-yellow-400'
                                        : 'bg-white/5 hover:bg-white/10'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-white text-sm font-medium truncate">
                                        {video.title}
                                    </span>
                                    {video.index === currentVideoIndex && (
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
