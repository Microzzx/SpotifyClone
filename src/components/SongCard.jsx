import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-20 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex
        ${
          activeSong?.title === song.title &&
          activeSong?.subtitle === song.subtitle
            ? "flex bg-black bg-opacity-70"
            : "hidden"
        }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlay={handlePlay}
            handlePause={handlePause}
          />
        </div>

        <img className="h-56" alt="song_img" src={song?.images?.coverarthq} />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.hub?.actions[0]?.id}`}>{song?.title}</Link>
        </p>
        <p className="text-sm text-white truncate mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SongCard;
