import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-[250px] p-4  bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => {
        navigate(`/artists/${track?.artists[0]?.adamid}`);
      }}
    >
      <img
        src={track?.images?.background}
        alt="artist image"
        className="w-full h-56 rounded-lg"
      />
      <p className="text-white text-lg font-semibold truncate mt-4">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
