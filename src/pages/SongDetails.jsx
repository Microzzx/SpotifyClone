import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetTopSongsQuery,
} from "../redux/services/shazam";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  console.log(songData);
  const artistId = songData?.data[0]?.relationships?.artists?.data[0]?.id;
  const {
    data,
    isFetching: isFetchingTopSongs,
    error,
  } = useGetTopSongsQuery({ artistId });
  console.log("4:", data);

  //const topSongData = Object.values(data);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingTopSongs) {
    return <Loader title="searching"></Loader>;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className="mb-10 ml-5 mt-5">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songData?.lyric ? (
            <p className="text-gray-300 text-base mt-1">Lyrics.</p>
          ) : (
            <p className="text-gray-300 text-base mt-1">No Lyrics Found. </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
        artistId={artistId}
      />
    </div>
  );
};

export default SongDetails;
