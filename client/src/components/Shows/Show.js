import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Functions
import { updateUser } from "../Auth/apiCalls";
import { toast } from "react-toastify";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Styles
import styles from "./Shows.module.css";

const Show = ({ show }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [isSelected, setIsSelected] = useState(false);
  const [isLiked, setIsLiked] = useState({
    likeButtonDisplay: true,
    dislikeButtonDisplay: true,
  });
  const [checkedAddList, setCheckedAddList] = useState(false);

  const link = "/shows/" + show.id;

  useEffect(() => {
    if (currentUser) {
      if (currentUser.showList.includes(show.id.toString())) {
        setCheckedAddList(true);
      }
      if (currentUser.likes.includes(show.id.toString())) {
        setIsLiked({ likeButtonDisplay: true, dislikeButtonDisplay: false });
        setIsSelected(true);
      } else if (currentUser.dislikes.includes(show.id.toString())) {
        setIsLiked({ likeButtonDisplay: false, dislikeButtonDisplay: true });
        setIsSelected(true);
      }
    }
  }, [currentUser, show.id]);

  const userAction = (action = "like") => {
    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    if (isSelected) {
      axios
        .get(`/shows/${currentUser._id}/${show.id}/undo`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/shows/${currentUser._id}/${show.id}/${action}`, config)
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
        .get(`/shows/${currentUser._id}/${show.id}/addList`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
          toast.success(show.name + " added to your list.");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/shows/${currentUser._id}/${show.id}/removeList`, config)
        .then((res) => {
          updateUser(currentUser, dispatch);
          toast.info(show.name + " removed from your list.");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setCheckedAddList(!checkedAddList);
  };

  return (
    <motion.li
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles.show_item}
    >
      <Link to={link}>
        <img
          src={show.image ? show.image.medium : "/tvmaze.jpg"}
          alt={show.name}
        />
      </Link>
      <div className="show-details">
        <h2>{show.name}</h2>
        {currentUser && (
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
        )}
      </div>
    </motion.li>
  );
};

export default Show;
