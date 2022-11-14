// Components
import { motion, AnimatePresence } from "framer-motion";
import Show from "./Show";

// Styles
import styles from "./Shows.module.css";

const Shows = ({ currentShows }) => {
  return (
    <motion.ul layout className={styles.show_list}>
      <AnimatePresence>
        {currentShows.length === 0 && <p>No matching shows found.</p>}
        {currentShows.map((show) => {
          return <Show show={show} key={show.id} />;
        })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default Shows;
