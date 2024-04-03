import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Peopole from "./Components/Peopole/Peopole";
import Tv from "./Components/Tv/Tv";
import Profile from "./Components/Profile/Profile";
import { Offline, Online } from "react-detect-offline";

import { useState, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import ItemDetails from "./Components/ItemDetails/ItemDetails";
import MediaContextProvider from "./Context/MediaContext";
import AuthContextProvider, { AuthContext } from "./Context/AuthContext";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import NotFound from "./Components/NotFound/NotFound";
// eslint-disable-next-line react-hooks/rules-of-hooks

// api key https://api.themoviedb.org/3/movie/550?api_key=b1e811355639277e7ac3e8af0af54dac
// api key with token eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWU4MTEzNTU2MzkyNzdlN2FjM2U4YWYwYWY1NGRhYyIsInN1YiI6IjY0MTVkZWIxMGQ1ZDg1MDA5YmExOTkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zf9WXiXEUqGt--9jOohBetWV96yOOnIhpJ7YFGQPiTs
function App() {
  let { userData, setUserData } = useContext(AuthContext);
  // function saveUserData() {
  //   // let encodedToken = localStorage.getItem("userToken");
  //   // let decodedToken = jwtDecode(encodedToken);
  //   // setUserdata(decodedToken);
  // }

  // useEffect(()=>{
  //   if(localStorage.getItem("userToken"!==null))
  //   {
  //     // saveUserData()
  //   }
  // },[])

  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement:<NotFound/>,
      children: [
        { index:true,  element: <Home />  },
        { path: "profile", element: <Profile /> },

        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "people", element: <Peopole /> },
        { path: "itemdetails/:id/:media_type", element: <ItemDetails /> },

        { path: "tv", element: <Tv /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routers} />
      </Provider>

      <div>
        <Offline>
          <div className="offline">you are offline now </div>
        </Offline>
      </div>
    </>
  );
}

export default App;
