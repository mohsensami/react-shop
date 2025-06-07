import React, { useEffect } from "react";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import useStore from "../store";

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
  return <Authorize>{children}</Authorize>;
};

export default Providers;
