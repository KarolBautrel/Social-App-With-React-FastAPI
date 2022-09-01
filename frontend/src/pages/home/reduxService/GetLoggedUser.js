import { useSelector, useDispatch } from "react-redux";
import { getLoggedUserData } from "../../../redux/auth";

export const GetLoggedUser = () => {
  const dispatch = useDispatch();
  const localStorageData = window.localStorage.getItem("AUTH_CREDENTIALS");
  const data = JSON.parse(localStorageData);

  try {
    dispatch(
      getLoggedUserData({
        username: data.user.user_username,
        email: data.user.user_email,
        token: data.access_token,
        id: data.user.user_id,
      })
    );
  } catch (error) {
    console.log("login");
  }
};
