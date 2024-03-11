import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "./Homepage";
import LeaderboardPage from "./LeaderBoardPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Homepage /> },
        {
          path: "/leaderboard/:name",
          element: <LeaderboardPage />,
        },
      ],
    },
    {
      path: "/:name",
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;