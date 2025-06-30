
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Rewind, FastForward, Video, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  src: string;
  title?: string;
}

const VideoPlayer = ({ src, title = "Video Player" }: VideoPlayerProps) => {
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  const [randomStartTime, setRandomStartTime] = useState(0);

  // Generate random start time (0 to 3600 seconds = 1 hour max)
  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 3600);
    setRandomStartTime(randomTime);
  }, []);

  // Convert Google Drive download URL to embed URL with autoplay and random start
  const getEmbedUrl = (url: string) => {
    const fileIdMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview?autoplay=1&start=${randomStartTime}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(src);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  const toggleAudioOnly = () => {
    setIsAudioOnly(!isAudioOnly);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
    >
      <iframe
        src={embedUrl}
        className={`w-full h-full ${isAudioOnly ? 'opacity-0' : 'opacity-100'}`}
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
      />
      
      {/* Audio Only Overlay */}
      {isAudioOnly && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <VolumeX size={80} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">Audio Only Mode</h2>
            <p className="text-gray-300">Video is hidden, audio continues playing</p>
          </div>
        </div>
      )}
      
      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300 pointer-events-none ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 z-10 pointer-events-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-semibold truncate">{title}</h1>
          <Button
            onClick={toggleAudioOnly}
            variant="secondary"
            size="sm"
            className="bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            {isAudioOnly ? (
              <>
                <Video size={16} className="mr-2" />
                Show Video
              </>
            ) : (
              <>
                <VolumeX size={16} className="mr-2" />
                Audio Only
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
