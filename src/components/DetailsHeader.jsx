import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

const DetailsHeader = ({ artistData, songData }) => {
  const attribute = artistData
    ? artistData?.data[0].attributes
    : songData?.data[0]?.attributes;

  const artistId = artistData
    ? artistData?.data[0].id
    : songData?.data[0]?.relationships?.artists?.data[0]?.id;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center ml-5">
        <img
          src={
            artistData
              ? attribute?.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : attribute?.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
          }
          className="sm:w-28 w-28 sm:h-28 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <div className="flex">
            <p className="text-white text-xl sm:text-3xl text-bold mr-5">
              {artistData ? attribute?.name : attribute?.albumName}
            </p>
          </div>

          {artistData ? (
            <p className=" text-base text-gray-300 mt-3">
              <a href={attribute?.url}>{attribute?.name}</a>
            </p>
          ) : (
            <Link to={`/artists/${artistId}`}>
              <p className=" text-base text-gray-300 mt-3">
                {attribute?.artistName}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-300 mt-3">
            {artistData ? attribute?.genreNames[0] : attribute?.genreNames[0]}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DetailsHeader;
