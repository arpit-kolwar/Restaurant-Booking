import axios from "axios";
const useAuth = () => {
  const sigin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const sigup = () => {};

  return {
    sigin,
    sigup,
  };
};

export default useAuth;
