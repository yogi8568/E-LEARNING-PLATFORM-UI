import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useState, useEffect } from "react";
import React from "react";

const courses = {
  "1": { title: "React Basics", videoId: "w7ejDZ8SWv8" },
  "2": { title: "Advanced JavaScript", videoId: "IljVmcDDrOg" },
};

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses[courseId];

  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${courseId}`);
    if (savedProgress) {
      setProgress(parseFloat(savedProgress));
    }
  }, [courseId]);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api"; // Corrected URL
        tag.async = true;
        tag.onload = () => {
          window.onYouTubeIframeAPIReady = createPlayer;
        };
        document.body.appendChild(tag);
      } else {
        createPlayer();
      }
    };

    const createPlayer = () => {
      if (player) {
        player.destroy(); // Destroy previous player if it exists
      }

      const newPlayer = new window.YT.Player("youtube-player", {
        videoId: course.videoId,
        playerVars: { controls: 1 },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            updateProgress(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              startTrackingProgress(event.target);
            }
            if (event.data === window.YT.PlayerState.UNSTARTED) {
              resetProgress();
            }
          },
        },
      });
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [courseId]);

  const startTrackingProgress = (playerInstance) => {
    const id = setInterval(() => {
      if (playerInstance && playerInstance.getCurrentTime && playerInstance.getDuration) {
        const currentTime = playerInstance.getCurrentTime();
        const duration = playerInstance.getDuration();

        if (duration > 0) {
          const newProgress = (currentTime / duration) * 100;
          setProgress(newProgress);
          localStorage.setItem(`progress_${courseId}`, newProgress);
        }

        // ✅ Reset progress if user restarts the video
        if (currentTime < 1) {
          resetProgress();
        }
      }
    }, 1000);
    setIntervalId(id);
  };

  const resetProgress = () => {
    setProgress(0);
    localStorage.setItem(`progress_${courseId}`, 0);
  };

  const updateProgress = (playerInstance) => {
    const savedProgress = localStorage.getItem(`progress_${courseId}`);
    if (savedProgress) {
      playerInstance.seekTo(
        (parseFloat(savedProgress) / 100) * playerInstance.getDuration()
      );
    }
  };

  if (!course) return <h2>Course Not Found</h2>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{course.title}</h1>
      <div id="youtube-player"></div> {/* div for youtube player */}
      <ProgressBar progress={progress} />
      <br />
      <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px" }}>
        Go Back
      </button>
    </div>
  );
};

export default CoursePage;