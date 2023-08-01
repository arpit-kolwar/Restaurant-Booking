import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { setAuthState } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Alert, CircularProgress } from "@mui/material";
import { CookieValueTypes, getCookie } from "cookies-next";
import axios from "axios";
// import { fetchUser } from "@/pages/api/auth/me";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const [disabled, setDisabled] = useState(true);

  const fetchUserData = async (jwt: string) => {
    try {
      if (jwt) {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        return response.data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log("there was an error", error);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAndDispatchUserData = async (
      jwt: CookieValueTypes,
      dispatch: AppDispatch
    ) => {
      try {
        dispatch(
          setAuthState({
            loading: false,
            data: null,
            error: null,
          })
        );
        const jwt = getCookie("jwt") as string;
        console.log("jwt in try", jwt);

        // Call the fetchUser function and pass the jwt value to it
        const userData = await fetchUserData(jwt);

        if (isMounted) {
          // Only update the state if the component is still mounted
          dispatch(
            setAuthState({
              loading: false,
              data: userData,
              error: null,
            })
          );
        }
      } catch (error: any) {
        if (isMounted) {
          // Only update the state if the component is still mounted
          dispatch(
            setAuthState({
              loading: false,
              data: null,
              error: error.response?.data?.errorMessage || "An error occurred.",
            })
          );
        }
      }
    };
    const jwt = getCookie("jwt");
    fetchAndDispatchUserData(jwt, dispatch);

    return () => {
      // Cleanup function to cancel any ongoing asynchronous tasks
      isMounted = false;
    };
  }, [dispatch]); // Empty dependency array - no need to include dispatch here

  //-----------------------------------------------------=====

  useEffect(() => {
    if (isSignin) {
      if (input.email && input.password) {
        return setDisabled(false);
      }
    } else {
      if (
        input.city &&
        input.email &&
        input.password &&
        input.firstName &&
        input.lastName &&
        input.phone
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [input]);

  const handleClick = () => {
    if (isSignin) {
      // console.log("working");

      signin({ email: input.email, password: input.password }, handleClose);
    } else {
      signup(input, handleClose);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();

  const { loading, error, data } = useAppSelector((state) => state.authReducer);
  // const naam = data?.firstName;
  // console.log("whole data", data);
  // console.log("data firstName:", naam);
  return (
    <>
      <button
        className={`${
          isSignin ? "bg-blue-400 text-white" : " "
        } border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {isSignin ? "Sign in" : "Sign up"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <div className="p-2">
                {error ? <Alert severity="error"> {error} </Alert> : null}

                <p className="uppercase font-bold text-center pb-2 border-b mb-2 ">
                  <p className="text-sm">
                    {isSignin ? "Login" : "Create Account"}
                  </p>
                  <p>{data?.firstName}</p>
                </p>
              </div>
              <div className="m-auto ">
                <h2 className="text-2xl font-light text-center">
                  {isSignin
                    ? "Log in into Your Account"
                    : "Create your OpenTable Account"}
                </h2>

                <AuthModalInputs
                  inputs={input}
                  handleChangeInput={handleChangeInput}
                  isSignin={isSignin}
                />
                <button
                  disabled={disabled}
                  className="bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400 "
                  onClick={handleClick}
                >
                  {isSignin ? "Sign In" : "Create Account"}
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
