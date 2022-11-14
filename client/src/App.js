import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faThumbsDown,
  faThumbsUp,
  faCheck,
  faPlus,
  faGear,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoadingSpinner from "./components/ui/loading";

// Actions
import {
  setShows,
  setFilteredShows,
  setSearchedShows,
} from "./store/actions/showsActions";

library.add(fab, faThumbsDown, faThumbsUp, faCheck, faPlus, faGear, faEllipsis);

// Pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ShowDetailPage = React.lazy(() => import("./pages/ShowDetailPage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    const getShows = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        dispatch(setShows(response.data));
        dispatch(setFilteredShows(response.data));
        dispatch(setSearchedShows(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    getShows();
  }, [dispatch]);

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar></Navbar>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/shows" exact>
            <Redirect to="/" />
          </Route>
          <Route path="/shows/page/:page" exact>
            <HomePage />
          </Route>
          <Route path="/shows/:id">
            <ShowDetailPage />
          </Route>
          <Route path="/settings">
            {!currentUser ? <Redirect to="/" /> : <SettingsPage />}
          </Route>
          <Route path="/auth">
            {currentUser ? <Redirect to="/" /> : <AuthPage />}
          </Route>
          <Route path="/:id/:username">
            <ProfilePage />
          </Route>
          <Route path="*">
            <p>Page not found</p>
          </Route>
        </Switch>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
