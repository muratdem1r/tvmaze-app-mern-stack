import React from "react";

// Styles
import styles from "./Profile.module.css";

// Components
import { motion, AnimatePresence } from "framer-motion";
import ProfileShow from "../ProfileShow/ProfileShow";

const Profile = ({ userInfos }) => {
  return (
    <React.Fragment>
      <div id="list" className={styles.show_list_container}>
        <h1>List</h1>
        <motion.ul className={styles.show_list}>
          <AnimatePresence>
            {userInfos.showList.map((showID, i) => {
              return <ProfileShow key={i} showID={showID} />;
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
      <div id="likes" className={styles.show_list_container}>
        <h1>Likes</h1>
        <motion.ul className={styles.show_list}>
          <AnimatePresence>
            {userInfos.likes.map((showID, i) => {
              return <ProfileShow key={i} showID={showID} />;
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <div id="dislikes" className={styles.show_list_container}>
        <h1>Dislikes</h1>
        <motion.ul className={styles.show_list}>
          <AnimatePresence>
            {userInfos.dislikes.map((showID, i) => {
              return <ProfileShow key={i} showID={showID} />;
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </React.Fragment>
  );
};

export default Profile;
