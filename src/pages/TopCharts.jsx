import { useSelector } from "react-redux";
import { Loader, Error, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazam";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery("");

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
        <h2 className="text-white text-3xl text-left font-bold">Top Charts</h2>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {data?.tracks.map((song, i) => (
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

export default TopCharts;
