import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetTopSongsQuery,
} from "../redux/services/shazam";

const SongDetails = () => {
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  const artistId = songData?.data[0]?.relationships?.artists?.data[0]?.id;
  const { data: TopSongData, isFetching: isFetchingTopSongs } =
    useGetTopSongsQuery({ artistId });

  if (isFetchingSongDetails || isFetchingTopSongs) {
    return <Loader title="searching"></Loader>;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
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
        data={Object.values(TopSongData?.data)}
        artistId={artistId}
      />
    </div>
  );
};

export default SongDetails;
