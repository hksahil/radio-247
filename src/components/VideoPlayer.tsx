
import React, { useState, useEffect } from 'react';
import { Volume, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src: string;
  title?: string;
}

const VideoPlayer = ({ src, title = "Video Player" }: VideoPlayerProps) => {
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [audioOnly, setAudioOnly] = useState(false);

  // Convert Google Drive download URL to embed URL
  const getEmbedUrl = (url: string) => {
    const fileIdMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(src);

  const handleMouseMove = () => {
    if (!audioOnly) {
      setShowControls(true);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
    }
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
        className={`w-full h-full transition-opacity duration-300 ${audioOnly ? 'opacity-0' : 'opacity-100'}`}
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
      />
      
      {/* Lofi Cozy Room Visual Overlay */}
      {audioOnly && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900 flex items-center justify-center overflow-hidden">
          {/* Cozy Room Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-orange-800/60 to-yellow-700/40">
            {/* Fireplace Glow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-64 bg-gradient-radial from-orange-400/30 via-red-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
            
            {/* Floating Embers */}
            <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute bottom-32 left-2/3 w-1 h-1 bg-red-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-28 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            
            {/* Book Shelves Silhouette */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-amber-900/60 to-transparent"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-amber-900/60 to-transparent"></div>
          </div>
          
          {/* Main Content - Sleeping Cat */}
          <div className="relative z-10 text-center">
            {/* Sleeping Cat with Throbbing Heart */}
            <div className="relative mb-8">
              {/* Cat Body */}
              <div className="text-8xl mb-4 filter drop-shadow-lg">
                😴
              </div>
              
              {/* Throbbing Heart */}
              <div className="absolute -top-4 -right-8 text-4xl animate-pulse" style={{
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                💤
              </div>
              
              {/* Heart Beat Indicator */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
            
            {/* Cozy Text */}
            <h2 className="text-3xl font-bold mb-2 text-amber-200 animate-pulse">
              {title}
            </h2>
            <p className="text-orange-300 mb-4 text-lg font-serif">
              ◈ Cozy Lofi Vibes ◈
            </p>
            <p className="text-yellow-400 text-sm font-serif opacity-80">
              ~ peaceful moments ~
            </p>
            
            {/* Fireplace Visual */}
            <div className="mt-12 relative">
              <div className="text-6xl animate-pulse" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                🔥
              </div>
              <div className="absolute -left-8 top-2 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                🔥
              </div>
              <div className="absolute -right-8 top-2 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>
                🔥
              </div>
            </div>
            
            {/* Cozy Elements */}
            <div className="mt-6 flex justify-center space-x-6 text-2xl">
              <span className="text-amber-400 animate-pulse">📚</span>
              <span className="text-orange-400 animate-pulse" style={{ animationDelay: '0.5s' }}>☕</span>
              <span className="text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }}>🕯️</span>
            </div>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 text-amber-400 font-serif text-sm opacity-60">
            [COZY_MODE]
          </div>
          <div className="absolute top-4 right-4 text-orange-400 font-serif text-sm opacity-60">
            [FIREPLACE]
          </div>
          <div className="absolute bottom-4 left-4 text-yellow-400 font-serif text-sm opacity-60">
            [PEACEFUL]
          </div>
          <div className="absolute bottom-4 right-4 text-amber-300 font-serif text-sm opacity-60">
            [LOFI_VIBES]
          </div>
        </div>
      )}
      
      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300 pointer-events-none ${
          (showControls || audioOnly) ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 z-10 pointer-events-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-semibold truncate">{title}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAudioOnly(!audioOnly)}
            className="text-white hover:bg-white/20 transition-all duration-300"
          >
            {audioOnly ? (
              <Volume className="w-5 h-5 text-amber-400" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
