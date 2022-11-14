import axios from "axios";

// Actions
import setCurrentUser from "../../store/actions/userActions";

// Functions
import { toast } from "react-toastify";

export const login = async (user, dispatch) => {
  try {
    const res = await axios.post("/auth/login", user);

    dispatch(setCurrentUser(res.data));

    toast.success(`Welcome ${res.data.username}`);
  } catch (error) {
    toast.error("Wrong password or email.");
  }
};

export const signUp = async (user, dispatch) => {
  try {
    await axios.post("auth/register", user);
    toast.success("You have successfully registered");
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const logout = (dispatch) => {
  dispatch(setCurrentUser(null));
  toast.success("see ya :)");
};

export const updateUser = async (currentUser, dispatch) => {
  try {
    const res = await axios.get("/users/" + currentUser._id);
    const accessToken = currentUser.accessToken;

    dispatch(setCurrentUser({ ...res.data, accessToken }));
  } catch (error) {
    console.log(error);
  }
};
