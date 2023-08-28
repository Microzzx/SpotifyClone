import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i }) => {
  const activeSong = "Seven (feat. Latto) (Explicit Ver.)";
  //console.log(song.trackMetadata.trackName);
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-20 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center item-center bg-black bg-opacity-50 group-hover:flex
        ${
          activeSong?.title === song.trackMetadata.trackName
            ? "flex bg-red-500 bg-opacity-70"
            : "hidden"
        }`}
        >
          <PlayPause />
        </div>
        <img
          className="h-56"
          alt="song_img"
          src={song.trackMetadata?.displayImageUri}
        />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.trackMetadata.trackName}</Link>
        </p>
        <p className="text-sm text-white truncate mt-1">
          <Link
            to={
              song.trackMetadata.artists
                ? `/artists/${song?.trackMetadata.artists[0]?.spotifyUri}`
                : "/top-artists"
            }
          >
            {song.trackMetadata.artists[0].name}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SongCard;
