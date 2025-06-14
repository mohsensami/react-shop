import { useEffect } from "react";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import useStore from "../store";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "../components/common/Footer/Footer";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Authorize>
        {children}
        <ToastContainer />
        <Footer />
      </Authorize>
    </QueryClientProvider>
  );
};

export default Providers;
