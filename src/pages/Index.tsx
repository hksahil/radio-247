
import VideoPlayer from '@/components/VideoPlayer';

const Index = () => {
  // Using your Google Drive video with the direct download URL format
  const videoUrl = "https://drive.google.com/uc?export=download&id=1EPrXWcAD_Y2TCulPUt7-BLOPuudQIXf2";
  
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
