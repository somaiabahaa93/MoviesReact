import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ItemDetails() {
  let { id, media_type } = useParams();

  const [itemDetails, setItemDetails] = useState({});
  useEffect(() => {
    getItemDetails(id, media_type);
  }, []);

  async function getItemDetails(id, media_type) {
    let { data } = await axios.get(
      ` https://api.themoviedb.org/3/${media_type}/${id}?api_key=b1e811355639277e7ac3e8af0af54dac`
    );
    console.log("data", data);
    setItemDetails(data);
  }

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          {itemDetails.poster_path ? (
            <img
              className="w-100"
              src={"https://image.tmdb.org/t/p/w500/" + itemDetails.poster_path}
            />
          ) : (
            <img
              className="w-100"
              src={
                "https://image.tmdb.org/t/p/w500/" + itemDetails.profile_path
              }
            />
          )}{" "}
        </div>
        <div className="col-md-9 m-auto ml-5 ">
          <h2>
            {itemDetails.title}
            {itemDetails.name}
          </h2>
          <p className="py-2 text-muted">{itemDetails.overview}</p>
          <h6>vote_average : {itemDetails.vote_average?.toFixed(1)}</h6>
          <h6>vote_count : {itemDetails.vote_count?.toFixed(0)}</h6>
        </div>
      </div>
    </>
  );
}
