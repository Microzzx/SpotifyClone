import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/spotify";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
  const date = "2023-08-17";
  const { data, isFetching, error } = useGetTopChartsQuery(date);
  const track = data?.map((item) => {
    return {
      title: item.trackMetadata.trackName,
      uri: item.trackMetadata.trackUri,
      imgUri: item.trackMetadata.displayImageUri,
      artist: {
        name: item.trackMetadata.artists[0].name,
        spotifyUri: item.trackMetadata.artists[0].spotifyUri,
      },
      audio: import.meta.env.VITE_AUDIO_SRC,
    };
  });
  console.log(track);

  const genresTitle = "Pop";
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  if (isFetching) return <Loader title="Loading songs ..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div
        className="w-full flex flex-col sm:flex-row justify-between items-center
       mt-4 md-10"
      >
        <h2 className="font-bold text-3xl text-left text-white">
          Discover {genresTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm
          rounded-xl outline-none mt-5 sm:mt-0"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {track?.map((song, i) => (
          <SongCard
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={track}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
