import axios from "axios";
import authSlice from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { deleteCookie } from "cookies-next";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    try {
      dispatch(setAuthState({ loading: true, data: null, error: null }));

      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password }
      );
      // console.log(response);
      dispatch(
        setAuthState({ loading: false, data: response.data, error: null })
      );
      handleClose();
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(
          setAuthState({
            loading: false,
            data: null,
            error: error.response.data.errorMessage,
          })
        );
      } else {
        // Handle other errors
        dispatch(
          setAuthState({
            loading: false,
            data: null,
            error: error.response.data.errorMessage,
          })
        );
      }
    }
  };

  // -----------------------------------------------------

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    try {
      dispatch(setAuthState({ loading: true, data: null, error: null }));

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { email, password, firstName, lastName, city, phone }
      );
      // console.log(response);
      dispatch(
        setAuthState({ loading: false, data: response.data, error: null })
      );
      handleClose();
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(
          setAuthState({
            loading: false,
            data: null,
            error: error.response.data.errorMessage,
          })
        );
      } else {
        // Handle other errors
        dispatch(
          setAuthState({
            loading: false,
            data: null,
            error: error.response.data.errorMessage,
          })
        );
      }
    }
  };

  const logout = () => {
    deleteCookie("jwt");
    dispatch(
      setAuthState({
        loading: false,
        data: null,
        error: null,
      })
    );
  };

  return {
    signin,
    signup,
    logout,
  };
};
export default useAuth;
