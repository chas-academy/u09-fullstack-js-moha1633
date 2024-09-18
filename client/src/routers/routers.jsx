import {createBrowserRouter} from "react-router-dom";
import Home from "../home/Home";
import App from "../App";
import { Shop } from "../shop/Shop";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/",
            element: <Home/>,

        },
        {
            path: "/shop",
            element: <Shop/>,
        }
      ]
    },
  ]);

  export default router