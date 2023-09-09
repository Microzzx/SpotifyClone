import { Loader, Error, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazam";

const TopArtists = () => {
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
        <h2 className="text-white text-3xl text-left font-bold">Top Artists</h2>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {data?.tracks.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
