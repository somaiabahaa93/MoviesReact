import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MediaContext } from "../../Context/MediaContext";
import MediaItem from "../MediaItem/MediaItem";

export default function Home() {
  let { trendingMovies, trendingPeople, trendingTv } = useContext(MediaContext);

  return (
    <>
      <div className="row py-4">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="w-25 brdr mb-3"></div>
            <h2 className="h4">
              Trending Movies <br />
              To Watch Right Now
            </h2>
            <p className="py-2 text-muted">Watched Movies to watch Right Now</p>
            <div className="w-100 brdr mt-3"></div>
          </div>
        </div>

        {trendingMovies
          .filter((item) => item.poster_path !== null)
          .slice(0, 10)
          .map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
      </div>
      <div className="row py-4">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="w-25 brdr mb-3"></div>
            <h2 className="h4">
              Trending Tv <br />
              To Watch Right Now
            </h2>
            <p className="py-2 text-muted">Watched Tv to watch Right Now</p>
            <div className="w-100 brdr mt-3"></div>
          </div>
        </div>

        {trendingTv
          .filter((item) => item.poster_path !== null)
          .slice(0, 10)
          .map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
      </div>
      <div className="row py-4">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="w-25 brdr mb-3"></div>
            <h2 className="h4">
              Trending People <br />
              To Watch Right Now
            </h2>
            <p className="py-2 text-muted">Watched People to watch Right Now</p>
            <div className="w-100 brdr mt-3"></div>
          </div>
        </div>

        {trendingPeople.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
