
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
      
      {/* Lofi Cyberpunk Visual Overlay */}
      {audioOnly && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-cyan-900 flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Neon Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(cyan 1px, transparent 1px),
                  linear-gradient(90deg, cyan 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'pulse 4s ease-in-out infinite'
              }}></div>
            </div>
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-pink-400 opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-40 right-32 w-6 h-6 bg-cyan-400 opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-400 opacity-60 animate-bounce" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300 opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Scanning Lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-8 animate-pulse" style={{
              animation: 'scan 3s linear infinite'
            }}></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 text-center text-white">
            {/* Cyberpunk Cat ASCII Art */}
            <div className="mb-8 font-mono text-pink-300 text-lg leading-tight filter drop-shadow-lg">
              <pre className="animate-pulse">
{`    /\\_/\\  
   ( o.o ) 
    > ^ <`}
              </pre>
            </div>
            
            {/* Neon Cat Emoji with Glow Effect */}
            <div className="text-8xl mb-6 animate-bounce" style={{
              filter: 'drop-shadow(0 0 20px #ff69b4) drop-shadow(0 0 40px #ff1493)',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              🐱
            </div>
            
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              {title}
            </h2>
            <p className="text-cyan-300 mb-4 text-lg font-mono animate-pulse">
              ◄ LOFI CYBERPUNK MODE ►
            </p>
            <p className="text-pink-400 text-sm font-mono opacity-80">
              ~ chill vibes only ~
            </p>
            
            {/* Additional Aesthetic Elements */}
            <div className="mt-8 flex justify-center space-x-4 text-2xl animate-pulse">
              <span className="text-pink-400">◆</span>
              <span className="text-cyan-400">◇</span>
              <span className="text-purple-400">◆</span>
              <span className="text-pink-300">◇</span>
              <span className="text-cyan-300">◆</span>
            </div>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 text-cyan-400 font-mono text-sm opacity-60">
            [AUDIO_ONLY]
          </div>
          <div className="absolute top-4 right-4 text-pink-400 font-mono text-sm opacity-60">
            [STREAMING]
          </div>
          <div className="absolute bottom-4 left-4 text-purple-400 font-mono text-sm opacity-60">
            [LOFI_MODE]
          </div>
          <div className="absolute bottom-4 right-4 text-cyan-300 font-mono text-sm opacity-60">
            [CYBERPUNK]
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
      
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
