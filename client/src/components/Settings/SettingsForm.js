import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Styles
import classes from "./SettingsForm.module.css";

// Functions
import { updateUser, logout } from "../Auth/apiCalls";
import { toast } from "react-toastify";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SettingsForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
  });

  useEffect(() => {
    setUser({
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
    });
  }, [currentUser]);

  const [changeUsername, setChangeUsername] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeDeleteModal, setChangeDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const usernameHandler = (e) => {
    e.preventDefault();

    const data = { username: e.target.username.value };
    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    axios
      .put(`/users/${currentUser._id}`, data, config)
      .then((res) => {
        toast.success("Username successfully changed!");
        updateUser(currentUser, dispatch);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cannot use this username.");
      });
  };
  const emailHandler = (e) => {
    e.preventDefault();

    const data = { email: e.target.email.value };
    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    axios
      .put(`/users/${currentUser._id}`, data, config)
      .then((res) => {
        toast.success("Email successfully changed!");
        updateUser(currentUser, dispatch);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cannot use this email.");
      });
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    const newPass = e.target.newPassword.value;
    const newPassConfirm = e.target.confirmPassword.value;

    if (newPass !== newPassConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    const data = { password: newPass };

    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    axios
      .put(`/users/${currentUser._id}`, data, config)
      .then((res) => {
        toast.success("Password successfully changed!");
        updateUser(currentUser, dispatch);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error!");
      });
  };
  const deleteHandler = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        token: "Bearer " + currentUser.accessToken,
      },
    };

    axios
      .delete(`/users/${currentUser._id}`, config)
      .then((res) => {
        toast.success("Your account successfully deleted.");
        logout(dispatch);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error!");
      });
  };
  return (
    <section className={classes.infos}>
      <h1>Your Infos</h1>
      <div className={classes.control}>
        <label>Your Username</label>
        <div className={classes.value}>
          <span>{user.username}</span>
          <button
            onClick={() => {
              setChangeUsername(!changeUsername);
            }}
          >
            <FontAwesomeIcon icon="fa-ellipsis"></FontAwesomeIcon>
          </button>
        </div>
        {changeUsername && (
          <form onSubmit={usernameHandler}>
            <label htmlFor="username">New Username</label>
            <div className={classes.group}>
              <input name="username" type="text" required />
              <button>Save</button>
            </div>
          </form>
        )}
      </div>
      <div className={classes.control}>
        <label>Your Email</label>
        <div className={classes.value}>
          <span>{user.email}</span>
          <button
            onClick={() => {
              setChangeEmail(!changeEmail);
            }}
          >
            <FontAwesomeIcon icon="fa-ellipsis"></FontAwesomeIcon>
          </button>
        </div>
        {changeEmail && (
          <form onSubmit={emailHandler}>
            <label htmlFor="email">New Email</label>
            <div className={classes.group}>
              <input name="email" type="email" required />
              <button>Save</button>
            </div>
          </form>
        )}
      </div>
      <div className={classes.control}>
        <label>Your Password</label>
        <div className={classes.value}>
          <span>*******</span>
          <button
            onClick={() => {
              setChangePassword(!changePassword);
            }}
          >
            <FontAwesomeIcon icon="fa-ellipsis"></FontAwesomeIcon>
          </button>
        </div>
        {changePassword && (
          <form onSubmit={passwordHandler}>
            <label htmlFor="newPassword">New Password</label>
            <div className={classes.group}>
              <input name="newPassword" type="password" required />
            </div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={classes.group}>
              <input name="confirmPassword" type="password" required />
              <button>Save</button>
            </div>
          </form>
        )}
      </div>
      <div className={classes.control}>
        <button
          onClick={() => {
            setChangeDeleteModal(!changeDeleteModal);
          }}
          className={classes.delete_button}
        >
          DELETE ACCOUNT
        </button>
        {changeDeleteModal && (
          <>
            <div className={classes.delete_modal}>
              <label>Are you sure?</label>
              <label>
                Type
                <span className={classes.danger}> "delete my account"</span>
              </label>
              <label></label>
              <div className={classes.group}>
                <input
                  onChange={(e) => {
                    setDeleteConfirm(e.target.value);
                  }}
                  name="deleteAccount"
                  type="text"
                  required
                />
              </div>
              <button
                onClick={deleteHandler}
                disabled={deleteConfirm === "delete my account" ? false : true}
                className={classes.delete_button}
              >
                DELETE ACCOUNT
              </button>
            </div>
            <div
              onClick={() => {
                setChangeDeleteModal(false);
              }}
              className={classes.modal_backdrop}
            ></div>
          </>
        )}
      </div>
    </section>
  );
};

export default SettingsForm;
