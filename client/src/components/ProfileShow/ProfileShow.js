import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Components
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Functions
import { updateUser } from "../Auth/apiCalls";
import { toast } from "react-toastify";

const ProfileShow = ({ showID }) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [isLiked, setIsLiked] = useState({
    likeButtonDisplay: true,
    dislikeButtonDisplay: true,
  });
  const [checkedAddList, setCheckedAddList] = useState(false);

  const [showInfos, setShowInfos] = useState({});
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const link = "/shows/" + showID;

  useEffect(() => {
    if (currentUser) {
      if (currentUser.showList.includes(showID.toString())) {
        setCheckedAddList(true);
      }
      if (currentUser.likes.includes(showID.toString())) {
        setIsLiked({ likeButtonDisplay: true, dislikeButtonDisplay: false });
        setIsSelected(true);
      } else if (currentUser.dislikes.includes(showID.toString())) {
        setIsLiked({ likeButtonDisplay: false, dislikeButtonDisplay: true });
        setIsSelected(true);
      }
    }
  }, [currentUser, showID]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/shows/" + showID)
      .then((res) => {
        setShowInfos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showID]);

  const userAction = (action = "like") => {
    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    if (isSelected) {
      axios
        .get(`/shows/${currentUser._id}/${showID}/undo`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/shows/${currentUser._id}/${showID}/${action}`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const likeHandler = () => {
    userAction("like");

    setIsSelected(!isSelected);
    setIsLiked({
      ...isLiked,
      dislikeButtonDisplay: !isLiked.dislikeButtonDisplay,
    });
  };

  const dislikeHandler = () => {
    userAction("dislike");

    setIsSelected(!isSelected);
    setIsLiked({ ...isLiked, likeButtonDisplay: !isLiked.likeButtonDisplay });
  };

  const addListHandler = () => {
    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    if (!checkedAddList) {
      axios
        .get(`/shows/${currentUser._id}/${showID}/addList`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
          toast.success("show added to your list.");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/shows/${currentUser._id}/${showID}/removeList`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
          toast.info("show removed from your list.");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setCheckedAddList(!checkedAddList);
  };

  return (
    <motion.li>
      <Link to={link}>
        <img
          src={showInfos.image ? showInfos.image.medium : "/tvmaze.jpg"}
          alt={showInfos.name}
        />
      </Link>

      {currentUser && (
        <div className="show-details">
          <div className="group">
            {isLiked.likeButtonDisplay && (
              <button
                onClick={likeHandler}
                className={isSelected ? "like-button selected" : "like-button"}
              >
                <FontAwesomeIcon icon="thumbs-up" />
              </button>
            )}
            {isLiked.dislikeButtonDisplay && (
              <button
                onClick={dislikeHandler}
                className={
                  isSelected ? "dislike-button selected" : "dislike-button"
                }
              >
                <FontAwesomeIcon icon="thumbs-down" />
              </button>
            )}
            <button
              onClick={addListHandler}
              className={
                checkedAddList ? "add-list-button selected" : "add-list-button"
              }
            >
              <FontAwesomeIcon icon={checkedAddList ? "fa-check" : "fa-plus"} />
            </button>
          </div>
        </div>
      )}
    </motion.li>
  );
};

export default ProfileShow;
