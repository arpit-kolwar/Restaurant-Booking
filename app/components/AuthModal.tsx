"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";

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

  const [disabled, setDisabled] = useState(true);

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
      }
    }
    setDisabled(true);
  }, [input]);

  const handleClick = () => {
    if (isSignin) {
      console.log("working");

      sigin({ email: input.email, password: input.password });
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
  const { sigin } = useAuth();

  return (
    <div>
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
          <div className="p-2">
            <p className="uppercase font-bold text-center pb-2 border-b mb-2 ">
              <p className="text-sm">{isSignin ? "Login" : "Create Account"}</p>
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
        </Box>
      </Modal>
    </div>
  );
}
