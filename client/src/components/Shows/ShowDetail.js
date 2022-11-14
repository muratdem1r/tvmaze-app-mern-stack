import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Functions
import { toast } from "react-toastify";
import { updateUser } from "../Auth/apiCalls";

// Styles
import styles from "./ShowDetail.module.css";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../ui/loading";

const Show = ({ show }) => {
  const div = document.createElement("div");
  div.innerHTML = show.summary;
  const summary = div.firstChild;

  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [isLiked, setIsLiked] = useState({
    likeButtonDisplay: true,
    dislikeButtonDisplay: true,
  });
  const [checkedAddList, setCheckedAddList] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    if (currentUser && show.id !== undefined) {
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
          toast.success("show added to your list.");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/shows/${currentUser._id}/${show.id}/removeList`, config)
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

  if (show.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <div className={styles["show-details"]}>
      {show.image && (
        <img
          className={styles["bg-img"]}
          src={show.image.original}
          alt={show.name}
        />
      )}
      <div className={styles.show}>
        <div className={styles["img-container"]}>
          <img
            src={show.image ? show.image.medium : "/tvmaze.jpg"}
            alt={show.name}
          />
        </div>
        <div className={styles["details-container"]}>
          <div className="group">
            <h1>{show.name}</h1>
            {currentUser && (
              <div className="show-details">
                <div className={`${styles["like-buttons"]} group`}>
                  {isLiked.likeButtonDisplay && (
                    <button
                      onClick={likeHandler}
                      className={
                        isSelected ? "like-button selected" : "like-button"
                      }
                    >
                      <FontAwesomeIcon icon="thumbs-up" />
                    </button>
                  )}
                  {isLiked.dislikeButtonDisplay && (
                    <button
                      onClick={dislikeHandler}
                      className={
                        isSelected
                          ? "dislike-button selected"
                          : "dislike-button"
                      }
                    >
                      <FontAwesomeIcon icon="thumbs-down" />
                    </button>
                  )}
                  <button
                    onClick={addListHandler}
                    className={
                      checkedAddList
                        ? "add-list-button selected"
                        : "add-list-button"
                    }
                  >
                    <FontAwesomeIcon
                      icon={checkedAddList ? "fa-check" : "fa-plus"}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
          <p
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: summary.innerHTML }}
          />
          <div className={styles.info}>
            <div>&#9734;{show.rating.average}</div>
            <div>{show.language}</div>
            <div>Status: {show.status}</div>
          </div>
          <div className={styles.genres}>
            <span>Genres: </span>
            <ul>
              {show.genres.map((genre, index) => {
                return <li key={index}>{genre}</li>;
              })}
            </ul>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href={show.url}
            alt={show.name}
            className={styles["more-info"]}
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default Show;
