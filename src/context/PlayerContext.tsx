import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

interface PlayerContextType {
  playWithId: (id: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  seekBar: React.RefObject<HTMLHRElement | null>;
  seekBg: React.RefObject<HTMLDivElement | null>;
  track: any;
  setTrack: React.Dispatch<React.SetStateAction<any>>;
  playerStatus: boolean;
  setPlayerStatus: React.Dispatch<React.SetStateAction<boolean>>;
  time: {
    currentTime: { second: number; minute: number };
    totalTime: { second: number; minute: number };
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      currentTime: { second: number; minute: number };
      totalTime: { second: number; minute: number };
    }>
  >;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seekSong: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

const PlayerContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBg = useRef<HTMLDivElement>(null);
  const seekBar = useRef<HTMLDivElement>(null);
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current?.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayerStatus(false);
  };

  const playWithId = (id: number) => {
    setTrack(songsData[id]);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setPlayerStatus(true);
          })
          .catch((err) => {
            console.error("Playback failed:", err);
            setPlayerStatus(false);
          });
      }
    }, 100);
  };

  const previous = () => {
    const currentIndex = songsData.findIndex((s) => s.id === track.id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      setTimeout(() => {
        audioRef.current?.play();
        setPlayerStatus(true);
      }, 100);
    }
  };

  const next = () => {
    const currentIndex = songsData.findIndex((s) => s.id === track.id);
    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      setTimeout(() => {
        audioRef.current?.play();
        setPlayerStatus(true);
      }, 100);
    }
  };

  const seekSong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current || !seekBg.current) return;

    // Get click position relative to the seek bar
    const rect = seekBg.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Calculate new time
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;

    // Update seekBar width immediately
    if (seekBar.current) {
      seekBar.current.style.width = `${(clickX / width) * 100}%`;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const audio = audioRef.current;
      const seek = seekBar.current;

      if (audio && seek) {
        audio.ontimeupdate = () => {
          seek.style.width =
            Math.floor((audio.currentTime / audio.duration) * 100) + "%";

          setTime({
            currentTime: {
              second: Math.floor(audio.currentTime % 60),
              minute: Math.floor(audio.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audio.duration % 60),
              minute: Math.floor(audio.duration / 60),
            },
          });
        };
      }
    }, 500);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
