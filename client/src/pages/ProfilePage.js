import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Components
import Profile from "../components/Profile/Profile";
import LoadingSpinner from "../components/ui/loading";

const ProfilePage = () => {
  const [profileUserInfos, setProfileUserInfos] = useState(null);
  const location = useLocation();
  const profileUserID = location.pathname.split("/")[1];

  useEffect(() => {
    console.log(profileUserID);
    axios
      .get("/users/" + profileUserID)
      .then((res) => {
        const { _id, username, likes, dislikes, showList } = res.data;
        setProfileUserInfos({ id: _id, username, likes, dislikes, showList });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profileUserID]);

  return (
    <>
      {profileUserInfos !== null ? (
        <div className="container">
          {" "}
          <Profile userInfos={profileUserInfos}></Profile>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default ProfilePage;
