import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Functions
import { logout } from "../Auth/apiCalls";

// Styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  let profileLink;
  if (currentUser) {
    profileLink = `/${currentUser._id}/${currentUser.username}`;
  }

  const logoutHandler = () => {
    logout(dispatch);
  };

  return (
    <nav>
      <Link to="/" className={styles.navbar_brand}>
        <span>TV</span>Maze
      </Link>
      <ul>
        {currentUser && (
          <React.Fragment>
            <li>
              <Link className={styles.link} to={profileLink}>
                Profile
              </Link>
            </li>
            <li>
              <button className={styles.link} onClick={logoutHandler}>
                Logout
              </button>
            </li>
            <li>
              <Link className={styles.link} to="/settings">
                <FontAwesomeIcon icon="fa-gear" />
              </Link>
            </li>
          </React.Fragment>
        )}
        {!currentUser && (
          <li>
            <Link className={styles.link} to="/auth">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
