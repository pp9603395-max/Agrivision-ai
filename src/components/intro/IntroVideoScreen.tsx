import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Sprout,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface IntroVideoScreenProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const IntroVideoScreen: React.FC<IntroVideoScreenProps> = ({
  onComplete,
  videoSrc = '/assets/videos/agrivision_ai_website_animation.mp4'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(11);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Chapters matching the exact 11-second AgriVision AI presentation video
  const chapters = [
    { start: 0, end: 3, label: '01 Smart Field Scan', desc: 'Multi-Spectral Crop & Soil Diagnostics' },
    { start: 3, end: 6, label: '02 Soil & Weather AI', desc: '15-Day Hyper-Local Climate Alerts' },
    { start: 6, end: 9, label: '03 Crop Profitability', desc: 'Daily Expected Yield & Income' },
    { start: 9, end: 11, label: '04 Proven Farmer Impact', desc: '18,000+ Farmers Across South Asia' },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          console.warn('Autoplay restricted by browser policy:', err);
          setAutoplayBlocked(true);
          setIsPlaying(false);
        });
    }

    // Keyboard controls: Escape to skip, Space to toggle play/pause
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    if (curr < 3) setActiveStep(0);
    else if (curr < 6) setActiveStep(1);
    else if (curr < 9) setActiveStep(2);
    else setActiveStep(3);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    handleSkip();
  };

  const handleVideoError = () => {
    console.warn('Video failed to load or play from primary source:', videoSrc);
    // If primary failed, try fallback relative url once
    if (videoRef.current && videoRef.current.src.includes('/assets/videos/')) {
      videoRef.current.src = '/agrivision-intro.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setHasError(true);
        setErrorMessage('Introductory video playback could not be started.');
      });
      return;
    }
    setHasError(true);
    setErrorMessage('Introductory video playback could not be started in this browser.');
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleSkip = () => {
    try {
      sessionStorage.setItem('agrivision_intro_completed', 'true');
    } catch {}
    onComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP BAR: Branding & Skip Button */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 shadow-md">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">AgriVision AI</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                Official Platform Intro
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Smart AI-Powered Crop Recommendation &amp; Agronomic Intelligence
            </p>
          </div>
        </div>

        {/* Skip Intro Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 bg-emerald-700/60 text-[10px] rounded text-emerald-200">
              Esc
            </kbd>
          </button>
        </div>
      </header>

      {/* CENTER: Main Video Player Stage */}
      <main className="relative flex-1 flex items-center justify-center p-4 md:p-8 min-h-0">
        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center group">
          
          {/* Real Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            autoPlay
            muted={isMuted}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            onClick={togglePlayPause}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Autoplay blocked overlay prompt */}
          {autoplayBlocked && !isPlaying && !hasError && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 bg-emerald-600/30 border border-emerald-500/50 rounded-full flex items-center justify-center text-emerald-400 shadow-xl mb-4 animate-pulse">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome to AgriVision AI</h3>
              <p className="text-xs text-slate-300 max-w-md mb-6">
                Click below to start the introductory overview of multi-spectral crop diagnostics, 15-day weather AI, and expected yield profitability.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayPause}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Intro Video</span>
                </button>
                <button
                  onClick={handleSkip}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Continue to Website
                </button>
              </div>
            </div>
          )}

          {/* Graceful Fallback if video fails to load or codec issue occurs */}
          {hasError && (
            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-white mb-1">
                {errorMessage || 'Video Playback Notice'}
              </h4>
              <p className="text-xs text-slate-400 max-w-md mb-5">
                The video stream could not be loaded directly by your browser. You can navigate directly into the platform to explore the interactive live field scanner and AI recommendations.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSkip}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Play/Pause Center Watermark on Hover */}
          {!hasError && !autoplayBlocked && (
            <div
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer pointer-events-none"
            >
              <div className="w-14 h-14 rounded-full bg-slate-900/80 border border-slate-700/80 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5 fill-current" />}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* BOTTOM CONTROLS & CHAPTER TIMELINE */}
      <footer className="relative z-10 w-full px-6 py-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
        <div className="max-w-5xl mx-auto space-y-3">
          
          {/* Progress Bar Scrubber */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400 w-10">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                handleSeek(pos * duration);
              }}
              className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative group"
            >
              <div
                className="h-full bg-emerald-500 rounded-full relative transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-500 w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls & Chapter Highlights */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            
            {/* Playback & Audio Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlayPause}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span className="text-[10px] text-slate-400 hidden md:inline">
                  {isMuted ? 'Muted' : 'Sound On'}
                </span>
              </button>

              <button
                onClick={() => handleSeek(0)}
                title="Restart Video"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Interactive Chapter Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full sm:w-auto">
              {chapters.map((ch, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSeek(ch.start)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left truncate cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span className="block font-semibold truncate">{ch.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Direct Enter Platform */}
            <button
              onClick={handleSkip}
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <span>Enter Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
