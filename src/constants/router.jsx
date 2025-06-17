import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories/Categories";
import Products from "../pages/Products/Products";
import Root from "../pages/Root";
import Card from "../pages/Card";
import Contact from "../pages/Contact/Contact";
import Faq from "../pages/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/categories/:id",
    element: <Categories />,
  },
  {
    path: "/products/:id",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Card />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
]);

export default router;
