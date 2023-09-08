import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetTopSongsQuery,
} from "../redux/services/shazam";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId });

  const { data: TopSongData, isFetching: isFetchingTopSongs } =
    useGetTopSongsQuery({ artistId });

  if (isFetchingArtistDetails || isFetchingTopSongs) {
    return <Loader title="searching"></Loader>;
  }

  if (error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <DetailsHeader artistData={artistData} songData="" />
      <div className="mb-10 ml-5 mt-5"></div>

      <RelatedSongs
        data={Object.values(TopSongData?.data)}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
