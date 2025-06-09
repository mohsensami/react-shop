import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store";

const Dashboard = () => {
  const { access_token, removeState } = useStore();
  const navigate = useNavigate();
  return (
    <>
      {access_token != null && access_token != undefined ? (
        <>
          <h1>Dashboard</h1>
        </>
      ) : (
        <Link
          className="underline flex items-center justify-center "
          to="/login"
        >
          <p className="bg-slate-500 px-4 py-2 capitalize text-slate-50 rounded-md my-16 text-xl">
            {" "}
            only logged in users can access to dashboard
          </p>
        </Link>
      )}
    </>
  );
};

export default Dashboard;
