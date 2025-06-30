
import VideoPlayer from '@/components/VideoPlayer';

const Index = () => {
  // You can replace this with your actual video URL
  // For now, using a placeholder - you'll need to host your MP4 file
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  return (
    <div className="w-full h-screen">
      <VideoPlayer 
        src={videoUrl}
        title="24/7 Video Stream"
      />
    </div>
  );
};

export default Index;
