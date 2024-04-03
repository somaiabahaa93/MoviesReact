import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
export let initialState = { trendingMovies: [], loading: false };

export let getTrending = createAsyncThunk("movies/getTrending", async () => {
  let { data } = axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=b1e811355639277e7ac3e8af0af54dac`
  );
  return data.results;
});

let MovieSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTrending.fulfilled);
  },
});

export let movieReducer = MovieSlice.reducer;

//////// at home component
// let { trendingMovies } = useSelector((state) => state.movie);
// let dispatch = useDispatch();
// useEffect(() => {
//   dispatch(getTrending());
// }, []);

// at app component
{
  /* <Provider>
 <RouterProvider></RouterProvider>   
</Provider> */
}
