import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ videoId, courseId, onProgressUpdate }) => {
  const playerRef = useRef(null);
  const [progress, setProgress] = useState(
    sessionStorage.getItem(`progress_${courseId}`) || 0
  );

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player(`youtube-player-${videoId}`, {
        height: "360",
        width: "640",
        videoId,
        playerVars: {
          rel: 0, // No recommended videos
          controls: 1,
          modestbranding: 1,
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onload = onYouTubeIframeAPIReady;
      document.body.appendChild(script);
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      const duration = playerRef.current.getDuration();
      const interval = setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        const newProgress = (currentTime / duration) * 100;
        setProgress(newProgress);
        sessionStorage.setItem(`progress_${courseId}`, newProgress);
        onProgressUpdate(newProgress);
      }, 2000);

      event.target.addEventListener("onStateChange", (e) => {
        if (e.data !== YT.PlayerState.PLAYING) {
          clearInterval(interval);
        }
      });
    }
  };

  return <div id={`youtube-player-${videoId}`} />;
};

export default VideoPlayer;
