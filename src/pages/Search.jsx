import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Error, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazam";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery({ searchTerm });
  const songs = data?.tracks?.hits?.map((song) => song.track);
  if (isFetching) {
    return <Loader title="Loading" />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <div
        className="w-full flex flex-col sm:flex-row justify-between items-center
       mt-4 mb-10"
      >
        <h2 className="text-white text-3xl text-left font-medium">
          Showing results for <span className="font-black">{searchTerm}</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.hub.actions[0].id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
