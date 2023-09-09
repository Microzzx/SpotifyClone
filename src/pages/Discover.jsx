import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazam";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery("");
  const topCharts = data?.tracks
    ?.filter((tracks) => tracks?.hub?.actions !== undefined)
    .slice(0, 20);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading songs ..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div
        className="w-full flex flex-col sm:flex-row justify-between items-center
       mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-left text-white">Discover</h2>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {topCharts.map((song, i) => (
          <SongCard
            key={song.hub.actions[0].id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={topCharts}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
