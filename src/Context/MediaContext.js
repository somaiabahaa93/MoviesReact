import { createContext } from "react";
import axios from "axios";
import React, { useEffect, useState } from "react";
export let MediaContext = createContext("");

export default function MediaContextProvider(props) {
  let [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  // eslint-disable-next-line no-unused-vars

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b1e811355639277e7ac3e8af0af54dac`
    );
    console.log("data", data.results);

    callback(data.results);
  }
  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MediaContext.Provider
      value={{ trendingMovies, trendingPeople, trendingTv }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}
