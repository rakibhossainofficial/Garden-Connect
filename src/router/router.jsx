import { createBrowserRouter } from "react-router";
import About from "../pages/About";
import ExploreGardeners from "../pages/ExploreGardeners";
import BrowseTips from "../pages/BrowseTips";
import ShareGardenTip from "../pages/ShareGardenTip";
import MyTips from "../pages/MyTips";
import Login from "../pages/Login";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import PrivateLayout from "../Layout/PrivateLayout";
import SignUp from "../pages/SignUp";
import TipsDetails from "../pages/TipsDetails";
import UpdateTipPage from "../components/UpdateTipPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "explore-gardeners", element: <ExploreGardeners /> },
      { path: "browse-tips", element: <BrowseTips /> },
      {
        element: <PrivateLayout />, // Protects all nested routes
        children: [
          { path: "share-garden-tip", element: <ShareGardenTip /> },
          { path: "my-tips", element: <MyTips /> },
          { path: "tips-details/:id", element: <TipsDetails /> },
          { path: "update-tip/:id", element: <UpdateTipPage /> },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
