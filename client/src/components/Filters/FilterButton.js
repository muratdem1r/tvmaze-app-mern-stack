import { useDispatch, useSelector } from "react-redux";

// Actions
import { changeGenre } from "../../store/actions/showsActions";

// Styles
import styles from "./FilterButton.module.css";

const FilterButton = ({ genre }) => {
  const dispatch = useDispatch();
  const activeGenre = useSelector((state) => state.showsReducer.genre);

  const clickHandler = () => {
    dispatch(changeGenre(genre));
  };

  return (
    <button
      className={
        activeGenre === genre
          ? styles.button.concat(" ", styles.active)
          : styles.button
      }
      onClick={clickHandler}
    >
      {genre}
    </button>
  );
};

export default FilterButton;
