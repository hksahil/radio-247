
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
      
      {/* Lofi Aesthetic Visual Overlay */}
      {audioOnly && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating particles */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-40 w-1 h-1 bg-cyan-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}></div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 text-center text-white">
            {/* Animated Cat */}
            <div className="relative mb-8">
              {/* Cat Body */}
              <div className="relative w-32 h-20 mx-auto">
                {/* Cat silhouette */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full transform scale-x-150">
                  {/* Cat ears */}
                  <div className="absolute -top-2 left-6 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-gray-800"></div>
                  <div className="absolute -top-2 right-6 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-gray-800"></div>
                  
                  {/* Cat face */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    {/* Eyes (closed for sleeping) */}
                    <div className="flex space-x-3 mb-1">
                      <div className="w-2 h-1 bg-gray-700 rounded-full"></div>
                      <div className="w-2 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                    {/* Nose */}
                    <div className="w-1 h-1 bg-pink-400 rounded-full mx-auto"></div>
                  </div>
                  
                  {/* Cat tail */}
                  <div className="absolute -right-8 top-2 w-12 h-2 bg-gray-800 rounded-full transform rotate-45 animate-pulse"></div>
                </div>
                
                {/* Breathing animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full transform scale-x-150 animate-pulse opacity-20"></div>
              </div>
              
              {/* Sleeping Z's */}
              <div className="absolute -top-4 -right-8 text-gray-400 font-mono">
                <div className="text-lg animate-bounce" style={{ animationDelay: '0s' }}>z</div>
                <div className="text-md animate-bounce ml-2 -mt-2 opacity-70" style={{ animationDelay: '0.5s' }}>z</div>
                <div className="text-sm animate-bounce ml-4 -mt-1 opacity-40" style={{ animationDelay: '1s' }}>z</div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-purple-300 mb-4 text-lg font-mono">
              ◄ LOFI CHILL MODE ►
            </p>
            <p className="text-pink-400 text-sm font-mono opacity-80">
              ~ peaceful vibes ~
            </p>
            
            {/* Decorative elements */}
            <div className="mt-8 flex justify-center space-x-4 text-xl">
              <span className="text-pink-400 animate-pulse">♪</span>
              <span className="text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }}>♫</span>
              <span className="text-cyan-400 animate-pulse" style={{ animationDelay: '1s' }}>♪</span>
            </div>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 text-purple-400 font-mono text-sm opacity-60">
            [AUDIO_ONLY]
          </div>
          <div className="absolute top-4 right-4 text-pink-400 font-mono text-sm opacity-60">
            [CHILLING]
          </div>
          <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-sm opacity-60">
            [LOFI_MODE]
          </div>
          <div className="absolute bottom-4 right-4 text-purple-300 font-mono text-sm opacity-60">
            [PEACEFUL]
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
              <Volume className="w-5 h-5 text-pink-400" />
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
