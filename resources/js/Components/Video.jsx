import React from 'react';

const YouTubeVideo = ({ isBanner=false, videoId }) => {
  return (
    <>
    {!isBanner ? 
    <div className="w-full relative py-9" style={{ height: '515px' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full py-9 md:px-24 px-9"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
    :
    <div className="w-full relative" style={{ height: '600px' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full "
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
        }
    </>
  );
};

export default YouTubeVideo;
