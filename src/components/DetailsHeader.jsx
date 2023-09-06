import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, songData }) => {
  const songAttribute = songData?.data[0]?.attributes;
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center ml-5">
        <img
          src={songAttribute?.artwork?.url
            .replace("{w}", "500")
            .replace("{h}", "500")}
          className="sm:w-28 w-28 sm:h-28 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="text-white text-xl sm:text-3xl text-bold ">
            {songAttribute?.albumName}
          </p>

          <Link to={`/artists/${artistId}`}>
            <p className=" text-base text-gray-300 mt-2">
              {songAttribute?.artistName}
            </p>
          </Link>

          <p className="text-base text-gray-300 mt-2">
            {songAttribute?.genreNames[0]}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DetailsHeader;
