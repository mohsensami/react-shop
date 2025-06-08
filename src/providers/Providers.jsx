import { useEffect } from "react";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import useStore from "../store";
import { RouterProvider } from "react-router-dom";
import router from "../constants/router";

const Authorize = ({ children }) => {
  const { setState } = useStore();
  useEffect(() => {
    const readCookie = async () => {
      const result = await getCookie("credential");
      setState(result);
      console.log(result);
    };

    readCookie();
  }, []);
  return <>{children}</>;
};

const Providers = ({ children }) => {
  return (
    <RouterProvider router={router}>
      <Authorize>{children}</Authorize>
    </RouterProvider>
  );
};

export default Providers;
