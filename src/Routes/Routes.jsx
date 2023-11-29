import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/User/Root";
import Home from "../Pages/Home/Home";
import AddArticles from "../Pages/AddArticles/AddArticles";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import AllArticles from "../Pages/AllArticles/AllArticles";
import ArticlesDetails from "../Pages/AllArticles/ArticlesDetails/ArticlesDetails";
import MyArticles from "../Pages/MyArticles/MyArticles";
import ErrorPage from "../Pages/404NotFound/ErrorPage";
import UpdateArticle from "../Pages/MyArticles/UpdateArticle";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AllArticlesAdmin from "../Pages/DashboardPage/AllArticles/AllArticlesAdmin";
import AllUsers from "../Pages/DashboardPage/AllUsers/AllUsers";
import AddPublisher from "../Pages/DashboardPage/AddPublisher/AddPublisher";
import AdminHome from "../Pages/DashboardPage/AdminHome/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addArticles",
        element: (
          <PrivateRoute>
            <AddArticles></AddArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/allArticles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/allArticles/:id",
        element: (
          <PrivateRoute>
            <ArticlesDetails></ArticlesDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/articles/${params.id}`),
      },
      {
        path: "/myArticles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateArticle/:id",
        element: (
          <PrivateRoute>
            <UpdateArticle></UpdateArticle>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/articles/${params.id}`),
      },
      {
        path: "/premiumArticles",
        element: (
          <PrivateRoute>
            <PremiumArticles></PremiumArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "allArticles",
        element: <AllArticlesAdmin></AllArticlesAdmin>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addPublisher",
        element: <AddPublisher></AddPublisher>,
      },
    ],
  },
]);

export default router;
