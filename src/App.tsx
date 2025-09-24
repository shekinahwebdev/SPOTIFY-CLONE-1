import { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("PlayerContext must be used within PlayerContextProvider");
  }
  const { audioRef, track } = context;

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <SideBar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default App;
