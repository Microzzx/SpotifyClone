import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader, Error, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazam";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery({ country });

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_aDRHL9AhsvZJ3jXb8AQpLWjOjjAUW&ipAddress=8.8.8.8"
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching || loading == true) {
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
        <h2 className="text-white text-3xl text-left font-bold">
          Around You {country}
        </h2>
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

export default AroundYou;
