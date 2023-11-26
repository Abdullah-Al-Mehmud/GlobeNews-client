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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
        element: (
          <PrivateRoute>
            <AllArticles></AllArticles>
          </PrivateRoute>
        ),
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
]);

export default router;
