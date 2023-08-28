import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ song, isPlaying, activeSong, HandlePlay, HandlePause }) =>
  isPlaying && activeSong?.title === song.trackMetadata.trackName ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={HandlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300 " onClick={HandlePlay} />
  );

export default PlayPause;
