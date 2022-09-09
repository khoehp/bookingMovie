import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.profile);

  const goToHome = () => {
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });
    
    goToHome();
  };

  const renderUserInfo = () => {
    if (userProfile)
      return (
        <>
          <a href="#">Hi, {userProfile.hoTen}</a>
          <a href="#" onClick={handleLogout}>
            Log out
          </a>
        </>
      );

    return (
      <>
        <NavLink activeClassName={styles.active} to="/signin">
          Sign in
        </NavLink>
        <NavLink activeClassName={styles.active} to="/signup">
          Sign up
        </NavLink>
      </>
    );
  };

  return (
    <div className={styles.header}>
      <span onClick={goToHome} className={styles.logo}>
        CyberMovie
      </span>
      <nav className={styles.navbar}>
        <NavLink activeClassName={styles.active} to="/" exact>
          Home
        </NavLink>
        <NavLink activeClassName={styles.active} to="/movies">
          Movies
        </NavLink>

        {renderUserInfo()}
      </nav>
    </div>
  );
}

export default Header;
